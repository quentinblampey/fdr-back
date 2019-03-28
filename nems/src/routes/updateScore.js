/*
  Computes the fidelity of the user.
*/
function fidelity(user) {
  if (user.numberChats.length === 0) {
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
    const reg = user.registration;
    var dateRegistration = [
      reg.getFullYear(),
      reg.getMonth() + 1,
      reg.getDate()
    ];

    if (today[1] - lastEval[1] >= 1 || today[0] - lastEval[0] >= 1) {
      score += 1;
    } else if (today[2] - lastEval[2] > 21) {
      score += 2;
    } else if (today[2] - lastEval[2] > 14) {
      score += 3;
    } else if (today[2] - lastEval[2] > 7) {
      score += 4;
    } else {
      score += 5;
    }

    var nbchats = user.numberChats.length;
    var nbMois =
      (today[0] - dateRegistration[0]) * 12 + today[1] - dateRegistration[1];

    if (nbMois === 0 && nbchats === 1) {
      score += 2;
    } else if (nbMois === 0) {
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

/*
  Computes the motivation of the user.
*/
function motivation(user) {
  let res = 0;
  let weights = 0;
  if (user.details.motivation !== undefined) {
    res += 3 * 2 * parseInt(user.details.motivation);
    weights += 3;
  }
  if (user.details.whyWorks !== undefined) {
    if (user.details.whyWorks !== "0") {
      res += 10;
      weights += 1;
    }
  }
  if (user.details.notesCours !== undefined) {
    if (user.details.notesCours === "0") {
      res += 5;
    }
    weights += 0.5;
  }
  if (user.details.repriseTD !== undefined) {
    if (user.details.repriseTD === "1") {
      res += 5;
    }
    weights += 0.5;
  }
  if (user.details.objectifPresenceTD !== undefined) {
    res += (5 / 2) * parseInt(user.details.objectifPresenceTD);
    weights += 0.5;
  }
  if (user.details.timeWork !== undefined) {
    res += (10 / 3) * parseInt(user.details.timeWork);
    weights += 1;
  }
  if (user.details.presenceTD !== undefined) {
    res += (10 / 3) * parseInt(user.details.presenceTD);
    weights += 1;
  }
  if (weights !== 0) {
    return res / weights;
  } else {
    return -1;
  }
}

/*
  Computes the lifestyle of the user.
*/
function lifestyle(user) {
  let res = 0;
  let weights = 0;
  if (user.details.houseOk !== undefined) {
    if (user.details.houseOk === "non") {
    } else {
      res += 10;
    }
    weights += 1;
  }
  if (user.details.timeToFac !== undefined) {
    if (user.details.timeToFac === "0") {
      res += 10;
    } else if (user.details.timeToFac === "1") {
      res += 6;
    }
    weights += 1;
  }
  if (user.details.timetoFacToLong !== undefined) {
    res += 2 * (10 - 5 * parseInt(user.details.timetoFacToLong));
    weights += 2;
  }
  if (user.details.familyResponsibilityDanger !== undefined) {
    res += 4 * (10 - 5 * parseInt(user.details.familyResponsibilityDanger));
    weights += 4;
  }
  if (user.details.manageTime !== undefined) {
    res += (10 / 2) * parseInt(user.details.manageTime);
    weights += 0.5;
  }
  if (
    user.details.sportBeforeComing === "non" &&
    !(user.details.sportBeforeComing === "non")
  ) {
    res += 5;
    weights += 0.5;
  } else if (
    user.details.sportBeforeComing !== "non" &&
    user.details.sportBeforeComing === "non"
  ) {
    weights += 0.5;
  }
  if (user.details.sportNowIsFun === "oui") {
    res += 5;
    weights += 0.5;
  }
  if (user.details.missingHome !== undefined) {
    if (user.details.missingHome === "1") {
      res += 8;
    }
    if (user.details.missingHome === "2") {
      res += 20;
    }
    weights += 2;
  }
  if (user.details.parentsOk !== undefined) {
    if (user.details.parentsOk === "0") {
      res += 20;
    }
    if (user.details.parentsOk === "1") {
      res += 8;
    }
    weights += 2;
  }
  if (user.details.sleep !== undefined) {
    if (user.details.sleep === "0") {
      res += 10;
    }
    if (user.details.sleep === "1") {
      res += 4;
    }
    weights += 1;
  }
  if (user.details.timeWithFriend !== undefined) {
    res += (parseInt(user.details.timeWithFriend) * 5) / 2;
    weights += 0.5;
  }
  if (user.details.changeHome === "oui") {
    weights += 3;
  }
  if (user.details.timeWithExtra !== undefined) {
    res += (parseInt(user.details.timeWithExtra) * 5) / 2;
    weights += 0.5;
  }
  if (weights !== 0) {
    return res / weights;
  } else {
    return -1;
  }
}

/*
  Computes the orientation of the user.
*/
function noOrientation(user) {
  let res = 0;
  let weights = 0;
  if (user.details.changeOrientation !== undefined) {
    if (user.details.changeOrientation === "non") {
      res += 14;
    }
    weights += 2;
  }
  if (user.details.whyWorks === "0") {
    weights += 0.5;
  } else if (user.details.whyWorks === "1" || user.details.whyWorks === "3") {
    res += 20;
    weights += 2;
  }
  if (user.details.helpMotivation === "0") {
    weights += 0.5;
  }
  res += 1;
  weights += 0.1;
  if (weights !== 0) {
    return res / weights;
  } else {
    return -1;
  }
}

/*
  Computes the integration of the user.
*/
function integration(user) {
  let res = 0;
  let weights = 0;
  if (user.details.integration !== undefined) {
    res += 2 * parseInt(user.details.integration);
    weights += 1;
  }
  if (user.details.house === 1) {
    res += 5;
    weights += 0.5;
  }
  if (user.details.house === 0) {
    weights += 0.5;
  }
  if (user.details.timeWithFriend !== undefined) {
    if (parseInt(user.details.timeWithFriend) > 0) {
      res += 10;
    }
    weights += 1;
  }
  if (user.details.newCity === "1") {
    weights += 0.5;
  }
  if (user.details.foreigner === "1") {
    weights += 1;
  }
  if (user.details.frenchLevel !== undefined) {
    res += 5 * parseInt(user.details.frenchLevel);
    weights += 1;
  }
  if (user.details.travailGroupe !== undefined) {
    res += (10 / 3 / 2) * parseInt(user.details.travailGroupe);
    weights += 0.5;
  }
  if (user.details.friendsOk === "non") {
    weights += 4;
  }
  if (user.details.newFriend !== undefined) {
    if (user.details.newFriend === "oui") {
      res += 20;
    }
    weights += 2;
  }
  if (user.details.knownPerson !== undefined) {
    res += (10 / 3) * 2 * parseInt(user.details.knownPerson);
    weights += 2;
  }
  if (weights !== 0) {
    return res / weights;
  } else {
    return -1;
  }
}

/*
  Updates the scores of the user, except for fidelity that should be calculated at the end of a chat.
*/
function updateScore(user) {
  user.score.motivation = motivation(user);
  user.score.lifestyle = lifestyle(user);
  user.score.noOrientation = noOrientation(user);
  user.score.integration = integration(user);

  let moy = 1;
  let n = 0;
  if (user.score.motivation > 0) {
    moy *= user.score.motivation;
    n++;
  }
  if (user.score.lifestyle > 0) {
    moy *= user.score.lifestyle;
    n++;
  }
  if (user.score.noOrientation > 0) {
    moy *= user.score.noOrientation;
    n++;
  }
  if (user.score.integration > 0) {
    moy *= user.score.integration;
    n++;
  }
  if (user.score.fidelity > 0) {
    moy *= user.score.fidelity;
    n++;
  }
  if (n === 0) {
    user.score.mean = -1;
  } else {
    user.score.mean = Math.pow(moy, 1.0 / n);
  }
}

/*
  Save user indicators in his historic.
*/
function saveScore(user) {
  if (
    user.historicScores.noOrientation.length === 0 ||
    (user.score.motivation !==
      user.historicScores.motivation[
        user.historicScores.motivation.length - 1
      ] ||
      user.score.fidelity !==
        user.historicScores.fidelity[user.historicScores.fidelity.length - 1] ||
      user.score.motivation !==
        user.historicScores.motivation[
          user.historicScores.motivation.length - 1
        ] ||
      user.score.integration !==
        user.historicScores.integration[
          user.historicScores.integration.length - 1
        ] ||
      user.score.noOrientation !==
        user.historicScores.noOrientation[
          user.historicScores.noOrientation.length - 1
        ])
  ) {
    user.historicScores.motivation.push(user.score.motivation);
    user.historicScores.lifestyle.push(user.score.lifestyle);
    user.historicScores.fidelity.push(user.score.fidelity);
    user.historicScores.integration.push(user.score.integration);
    user.historicScores.noOrientation.push(user.score.noOrientation);
  }
}

module.exports = {
  updateScore: updateScore,
  fidelity: fidelity,
  saveScore: saveScore
};
