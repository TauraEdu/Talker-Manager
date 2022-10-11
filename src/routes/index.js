const express = require('express');
const talkerRouter = require('./talker-router');
const loginRouter = require('./login-router');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/talker', talkerRouter);

module.exports = router;