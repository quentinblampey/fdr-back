from __future__ import print_function
import os

import csv
import json

# Import csv


def importFile(path):
    questions = []
    with open(path, 'rt', encoding='utf8') as csvfile:
        imp = csv.reader(csvfile, delimiter=';')
        i = 0
        for row in imp:
            if i < 2:
                i += 1
            else:
                questions.append(row)
    return questions


def checkBool(value):
    if value == "VRAI":
        return True
    elif value == "FAUX":
        return False
    return value


def process(questions):

    def toJSON(question):
        dic = {}
        labels = ['idQ', 'body', 'persoBody', 'field', 'textArea']
        answers = [{}]
        answersLabels = ['idQ', 'body', 'breakPoint', 'reaction', 'detail']
        dic['personalized'] = (question[1] == '')
        for i in range(len(labels)):
            if i == 2:
                dic[labels[i]] = question[i].split('/')
            else:
                dic[labels[i]] = checkBool(question[i])
        for i in range(len(question)-len(labels)):
            if question[len(labels)+i] != '':
                if (not i % 5)and i > 0:
                    answers.append({})
                answers[-1][answersLabels[i % 5]
                            ] = checkBool(question[len(labels)+i])
        dic['answers'] = answers
        return dic
    print(questions[65])
    json_string = json.dumps(
        [toJSON(q) for q in questions if q[0] != ''], ensure_ascii=False)
    #print(json_string)
    return json_string


def writeFile(json_string):
    f = open("./uploads/q3.json", "w", encoding='utf-8')
    f.write(json_string)
    f.close()


def main(path):
    questions = importFile(path)
    json_string = process(questions)
    writeFile(json_string)

main('./uploads/q3.csv')
