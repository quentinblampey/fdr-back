const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Slot = require("../models/Slot.js");

/*
  Function used to calculate the priority of a user.
  If there is a conflict of the kind 'two user for one slot', this function will be used to choose the user with greater priority.
*/
function priority(user) {
  return 10 - user.score.mean + 4 * user.aide;
}

/*
  Given slots ids and the slots chosen by the users, returns a list containing some { id : id of the user, slot : id of the slot assigned } and the sum of priorities.
*/

function assign(slots, usersChoices) {
  if (slots.length === 0) {
    return [[], 0];
  } else {
    let maxPriority = -1;
    let priorityUser;
    let assigns;
    let priorityRec;
    let userChoices;
    for (let i = 0; i < usersChoices.length; i++) {
      if (usersChoices[i].choices.indexOf(slots[0]) > -1) {
        usersChoicesRec = usersChoices.slice();
        userChoices = usersChoicesRec[i];
        usersChoicesRec.splice(i, 1);
        slotsRec = slots.slice(1);
        [assignsRec, priorityRec] = assign(slotsRec, usersChoicesRec);
        priorityUser = priority(userChoices.user);
        if (priorityUser + priorityRec > maxPriority) {
          maxPriority = priorityUser + priorityRec;

          assigns = [{ id: userChoices.user._id, slot: slots[0] }].concat(
            assignsRec
          );
        }
      }
    }
    if (maxPriority === -1) {
      return assign(slots.slice(1), usersChoices);
    } else {
      return [assigns, maxPriority];
    }
  }
}

// Given a number of slots and a list containing some { user , slotChoices}, returns some { userID, slotAssignement }

function assignShort(slotsIDs, usersChoices) {
  return assign(slotsIDs, usersChoices)[0];
}

function addSlotUser(slotId, userId, users) {
  for (let user of users) {
    if (user._id === userId) {
      user.currentSlot = slotId;
      user.passedSlots.push(slotId);
      user.chosenSlots = [];
      user.save();
      break;
    }
  }
}

function addUserSlot(slotId, userId, slots) {
  for (let slot of slots) {
    if (slot._id === slotId) {
      slot.affectation = userId;
      slot.save();
      break;
    }
  }
}

/*
  Role    | Assign the students to a slot after their have chosen between different slots proposed by their teacher.
  Params  | None
  Body    | None
  Returns | None
*/

router.post("/", function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }
    Slot.find({ affectation: "" }, function(err, slots) {
      if (err) {
        return next(err);
      }
      let slotsIDs = [];
      slots.forEach(slot => {
        slotsIDs.push(slot._id);
      });
      let usersChoices = [];
      users.forEach(user => {
        if (user.chosenSlots && user.chosenSlots.length > 0) {
          usersChoices.push({ user: user, choices: user.chosenSlots });
        }
      });
      assignShort(slotsIDs, usersChoices).forEach(assignement => {
        addSlotUser(assignement.slot, assignement.id, users);
        addUserSlot(assignement.slot, assignement.id, slots);
      });
      res.json("Assignement done!");
    });
  });
});

module.exports = router;
