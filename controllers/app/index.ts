const router = require("express").Router();

router.use('/user', require('./user'));
router.use('/process', require('./process'));

export = router;