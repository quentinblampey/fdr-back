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

    var dateRegistration = [
      user.registration.split("T")[0].split("-")[0],
      user.registration.split("T")[0].split("-")[1],
      user.registration.split("T")[0].split("-")[2]
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
  return 10 * Math.random();
}

function lifestyle(user) {
  return 10 * Math.random();
}

function noOrientation(user) {
  return 10 * Math.random();
}

function integration(user) {
  return 10 * Math.random();
}

// FUNCTION THAT UPDATE SCORES OF THE USER, EXCEPT FIDELITY, THAT SHOULD BE CALCULATED AT THE END OF A CHAT

function updateScore(user) {
  user.score.motivation = motivation(user);
  user.score.lifestyle = lifestyle(user);
  user.score.noOrientation = noOrientation(user);
  user.score.integration = integration(user);
}

module.exports = { updateScore: updateScore, fidelity: fidelity };
