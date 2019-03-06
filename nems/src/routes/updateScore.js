/* eslint-disable indent */
function fidelity(user) {
  if (
    user.numberChats === undefined ||
    user.numberChats === null ||
    user.numberChats.length === 0
  ) {
    return 0;
  } else {
    var score = 0;
    var d = new Date();
    var today = [d.getFullYear(), d.getMonth() + 1, d.getDate()];

    var lastChat = user.numberChats[user.numberChats.length - 1];
    var lastEval = [
      lastChat.split("T")[0].split("-")[0],
      lastChat.split("T")[0].split("-")[1],
      lastChat.split("T")[0].split("-")[2]
    ];
    const reg = user.registration + "";
    var dateRegistration = [
      reg.split("T")[0].split("-")[0],
      reg.split("T")[0].split("-")[1],
      reg.split("T")[0].split("-")[2]
    ];

    if (today[1] - lastEval[1] >= 1 || today[0] - lastEval[0] >= 1) {
      score += 1;
    } else if (today[2] - lastEval[2] > 21) {
      score += 2;
    } else if (today[2] - lastEval[2] > 14) {
      score += 3;
    } else if (today[2] - lastEval[2] > 7) {
      score += 4;
    } else if (today[2] - lastEval[2] < 7) {
      score += 5;
    }

    var nbchats = user.numberChats.length;
    var nbMois =
      (today[0] - dateRegistration[0]) * 12 + today[1] - dateRegistration[1];

    if (nbMois === 0 && nbchats === 1) {
      score += 2;
    } else if (nbMois === 0 && nbchats === 2) {
      score += 4;
    } else if (nbchats > 2 * nbMois) {
      score += 5;
    } else if (nbchats > nbMois) {
      score += 3;
    } else if (nbchats < nbMois) {
      score += 1;
    }

    return score;
  }
}

function motivation(user) {
  // return 10 * Math.random();
  let res = 0;
  let weights = 0;
  if (user.details.motivation != undefined) {
    res += 3 * 2 * parseInt(user.details.motivation);
    weights += 3;
  }
  if (user.details.whyWorks != undefined) {
    if (user.details.whyWorks != "0") {
      res += 10;
      weights += 1;
    }
  }
  if (user.details.presenceTD != undefined) {
    res += (10 / 3) * parseInt(user.details.presenceTD);
    weights += 1;
  }
  if (weights != 0) {
    return res / weights;
  } else {
    return -1;
  }
}

function lifestyle(user) {
  // return 10 * Math.random();
  let res = 0;
  let weights = 0;
  if (user.details.houseOk != undefined) {
    if (user.details.houseOk == "non") {
    } else {
      res += 10;
    }
    weights += 1;
  }
  if (user.details.timeToFac != undefined) {
    if (user.details.timeToFac == "0") {
      res += 10;
    } else if (user.details.timeToFac == "1") {
      res += 6;
    }
    weights += 1;
  }
  if (
    user.details.sportBeforeComing == "non" &&
    !(user.details.sportBeforeComing == "non")
  ) {
    res += 5;
    weights += 0.5;
  } else if (
    user.details.sportBeforeComing != "non" &&
    user.details.sportBeforeComing == "non"
  ) {
    weights += 0.5;
  }
  if (user.details.timeWithFriend != undefined) {
    res += (parseInt(user.details.timeWithFriend) * 5) / 2;
    weights += 0.5;
  }
  if (user.details.timeWithExtra != undefined) {
    res += (parseInt(user.details.timeWithExtra) * 5) / 2;
    weights += 0.5;
  }
  if (weights != 0) {
    return res / weights;
  } else {
    return -1;
  }
}

function noOrientation(user) {
  // return 10 * Math.random();
  let res = 0;
  let weights = 0;
  if (user.details.changeOrientation != undefined) {
    if (user.details.changeOrientation == "non") {
      res += 14;
    }
    weights += 2;
  }
  if (user.details.whyWorks == "0") {
    weights += 0.5;
  } else if (user.details.whyWorks == "1" || user.details.whyWorks == "3") {
    res += 20;
    weights += 2;
  }
  if (user.details.helpMotivation == "0") {
    weights += 0.5;
  }
  res += 1;
  weights += 0.1;
  if (weights != 0) {
    return res / weights;
  } else {
    return -1;
  }
}

function integration(user) {
  // return 10 * Math.random();
  let res = 0;
  let weights = 0;
  if (user.details.integration != undefined) {
    res += 2 * parseInt(user.details.integration);
    weights += 1;
  }
  if (user.details.house == 1) {
    res += 5;
    weights += 0.5;
  }
  if (user.details.house == 0) {
    weights += 0.5;
  }
  if (user.details.timeWithFriend != undefined) {
    if (parseInt(user.details.timeWithFriend) > 0) {
      res += 10;
    }
    weights += 1;
  }
  if (user.details.friendsOk == "non") {
    weights += 4;
  }
  if (user.details.newFriend != undefined) {
    if (user.details.newFriend == "oui") {
      res += 20;
    }
    weights += 2;
  }
  if (user.details.knownPerson != undefined) {
    res += (10 / 3) * 2 * parseInt(user.details.knownPerson);
    weights += 2;
  }
  if (weights != 0) {
    return res / weights;
  } else {
    return -1;
  }
}

// FUNCTION THAT UPDATE SCORES OF THE USER, EXCEPT FIDELITY, THAT SHOULD BE CALCULATED AT THE END OF A CHAT

function updateScore(user) {
  user.score.motivation = motivation(user);
  user.score.lifestyle = lifestyle(user);
  user.score.noOrientation = noOrientation(user);
  user.score.integration = integration(user);
}

// SAVE SCORE OF THE USER IN HIS HISTORIC

function saveScore(user) {
  user.historicScores.motivation.push(user.score.motivation);
  user.historicScores.lifestyle.push(user.score.lifestyle);
  user.historicScores.fidelity.push(user.score.fidelity);
  user.historicScores.integration.push(user.score.integration);
  user.historicScores.noOrientation.push(user.score.noOrientation);
}

module.exports = {
  updateScore: updateScore,
  fidelity: fidelity,
  saveScore: saveScore
};
