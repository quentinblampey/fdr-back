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

function assignShort(number, usersChoices) {
  return assign(
    Array.from(Array(number)).map((e, i) => i + 1),
    usersChoices
  )[0];
}

module.exports = assignShort;
