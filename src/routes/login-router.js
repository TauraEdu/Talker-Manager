const express = require('express');
const generateToken = require('../utils/gerateLoginToken');
const validateEmail = require('../middlewares/validadeEmail');
const validatePassword = require('../middlewares/validadePassord');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;