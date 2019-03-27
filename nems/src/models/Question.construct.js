/*
Takes in argument a question and a table of details.
Builds the body text of the function, including the personal data in the text field.
Distiguishes the question by its id, an behaves accordingly.
Returns a question with its body updated.
*/
var construct = function(question, details) {
  switch (question.idQ) {
    case 2:
      question.body =
        question.persoBody[0] +
        " " +
        details.name +
        " " +
        question.persoBody[1];
      break;
    case 7:
      question.body = details.sportBeforeComing + " " + question.persoBody[0];
      break;
    case 10:
      if (details.sportNow == "same") {
        question.body =
          question.persoBody[0] +
          " " +
          details.sportBeforeComing +
          question.persoBody[1];
      } else {
        question.body =
          question.persoBody[0] +
          " " +
          details.sportNow +
          question.persoBody[1];
      }
      break;
    case 12:
      if (details.sportNow == "same") {
        question.body =
          question.persoBody[0] +
          " " +
          details.sportBeforeComing +
          " " +
          question.persoBody[1];
      } else {
        question.body =
          question.persoBody[0] +
          " " +
          details.sportNow +
          " " +
          question.persoBody[1];
      }
      break;
    case 31:
      if (details.newFriend == "0") {
        question.body = question.persoBody[0] + " 0 " + question.persoBody[1];
      } else {
        question.body =
          question.persoBody[0] + " moins de 2 " + question.persoBody[1];
      }
      break;
    case 61:
      if (details.presenceTD == "2") {
        question.body =
          question.persoBody[0] + " souvent " + question.persoBody[1];
      } else {
        question.body =
          question.persoBody[0] + " toujours " + question.persoBody[1];
      }
      break;
    case 62:
      if (details.objectifPresenceTD == "1") {
        question.body =
          question.persoBody[0] + " un peu " + question.persoBody[1];
      } else {
        question.body =
          question.persoBody[0] + " beaucoup " + question.persoBody[1];
      }
      break;
  }
  return question;
};

module.exports = construct;
