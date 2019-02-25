var construct = function(question,details) {
    switch (question.idQ) {
      case 2:
        question.body = question.persoBody[0] + " " + details.name + " " + question.persoBody[1];
        break;
      case 7:
        question.body = question.persoBody[0] + " " + details.sportBeforeComing + " " + question.persoBody[1];
        break;
      case 10:
        if (details.sportNow=="same") {
          question.body = question.persoBody[0] + " " + details.sportBeforeComing + " " + question.persoBody[1];
        }
        else {
          question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
        }
        break;
      case 11:
        if (details.sportNow=="same") {
          question.body = question.persoBody[0] + " " + details.sportBeforeComing + " " + question.persoBody[1];
        }
        else {
          question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
        }
        break;
      case 12:
        if (details.sportNow=="same") {
          question.body = question.persoBody[0] + " " + details.sportBeforeComing + " " + question.persoBody[1];
        }
        else {
          question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
        }
        break;
    }
    return question;
  };

module.exports = construct;