const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Slot = require("../models/Slot.js");

function priority(user) {
  return 10 - user.score.mean + 4 * user.aide;
}

function assign(slots, usersChoices) {
  if (slots.length === 1) {
    let id = -1;
    let maxPriority = 0;
    let priorityUser;
    for (let userChoice of usersChoices) {
      if (userChoice.choices.includes(slots[0])) {
        priorityUser = priority(userChoice.user);
        if (priorityUser > maxPriority) {
          maxPriority = priorityUser;
          id = userChoice.user.id;
        }
      }
    }
    if (id === -1) {
      return [[], 0];
    } else {
      return [[{ id: id, slot: slots[0] }], maxPriority];
    }
  } else {
    let maxPriority = 0;
    let priorityUser;
    let assigns;
    let priorityRec;
    let userChoices;
    for (let i = 0; i < usersChoices.length; i++) {
      if (usersChoices[i].choices.includes(slots[0])) {
        usersChoicesRec = usersChoices.slice();
        userChoices = usersChoicesRec[i];
        usersChoicesRec.splice(i, 1);
        slotsRec = slots.slice(1);
        [assignsRec, priorityRec] = assign(slotsRec, usersChoicesRec);
        priorityUser = priority(userChoices.user);
        if (priorityUser + priorityRec > maxPriority) {
          maxPriority = priorityUser + priorityRec;

          assigns = [{ id: userChoices.user.id, slot: slots[0] }].concat(
            assignsRec
          );
        }
      }
    }
    if (maxPriority === 0) {
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
      user.chosenSlots.forEach(slotID => {
        user.passedSlot.push(slotID);
      });
      user.chosenSlots = [];
      user.save();
      break;
    }
  }
}

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
        if (user.chosenSlots) {
          usersChoices.push({ user: user, choices: user.chosenSlots });
        }
      });
      assignShort(slotsIDs, usersChoices).forEach(assignement => {
        addSlotUser(assignement.slot, assignement.id, users);
      });
      res.json();
    });
  });
});

module.exports = router;
