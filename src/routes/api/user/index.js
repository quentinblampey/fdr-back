const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const User = require('../../../models/user');
const lo = require('lodash');

/**
 * Basic user input sanitization
 * @param {any} obj user input object
 * @returns {Boolean} whether input is valid or not
 */
function checkUserInput (obj) {
    const props = ['firstName', 'lastName', 'email'];
    let valid = lo.reduce(props, (result, prop) => {
        return result | Number((!lo.isString(obj[prop]) || lo.isEmpty(obj[prop])));
    }, 0);
    return valid === 0;
}

router.get('/', (req, res, next) => {
    User.find({}).then((result) => res.status(HttpStatus.OK).send(result), err => {
        return next(err);
    });
});


router.get('/:id', (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId).then((result) => {
        if (lo.isNull(result)) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    }, err => {
        return next(err);
    });
});

router.post('/', (req, res, next) => {
    if (checkUserInput(req.body)) {
        let user = new User(req.body);
        user.save().then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }, err => {
            return next(err);
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).send();
    }
});

router.put('/:id', (req, res, next) => {
    const userId = req.params.id;
    if (checkUserInput(req.body)) {
        let user = req.body;
        User.findByIdAndUpdate(userId, user).then(result => {
            res.status(HttpStatus.NO_CONTENT).send();
        }, err => {
            return next(err);
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST);
    }
});

router.delete('/:id', (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId).then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
    }, err => {
        return next(err);
    });
});

module.exports = router;
