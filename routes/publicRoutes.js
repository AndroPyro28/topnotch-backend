const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController')

router.get('/getFirstThreeFeedback', publicController.getFirstThreeFeedback)
router.post('/findAccountAndSendEmail', publicController.findAccountAndSendCode)
router.post('/verifyCode', publicController.verifyCode)
module.exports = router;