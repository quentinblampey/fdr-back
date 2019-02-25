const router = require('express').Router();

// Example route
router.use('/user', require('./user'));

// Register new routes like so :
// router.use('/path', require('./module'));

module.exports = router;
