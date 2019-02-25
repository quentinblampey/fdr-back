/* eslint-disable handle-callback-err */
const HttpStatus = require('http-status-codes');

module.exports = {
    handler () {
        return (err, req, res, next) => {
            let obj = {
                message: 'I\'ve got a bad feeling about this',
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
            if (err instanceof Error) {
                obj.message = err.message;
            }
            console.log(obj.name);
            res.status(obj.status).json(obj);
        };
    },
};
