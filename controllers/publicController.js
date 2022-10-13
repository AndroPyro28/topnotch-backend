const Feedback = require("../models/Feedback");
const nodemailer = require('nodemailer');
const MultipleTable = require("../models/MultipleTable");
const gmailSender = require("../helpers/GmailSender");

module.exports.getFirstThreeFeedback = async (req, res) => {
    try {
        const feedbackModel = new Feedback({});
        const result = await feedbackModel.getFirstThreeFeedback();
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message)
    }
}

module.exports.findAccountAndSendCode = async (req, res) => {
try {
    const multipleQuery = new MultipleTable();
    const {email} = req.body.values;
    const result = await multipleQuery.findEmail(email)
    const customer = result[0][0]
    const admin = result[1][0]

    if(customer?.id) {
        gmailSender(customer?.email)
    }
    else if(admin?.id) {
        gmailSender(admin?.email)
    } 
    else {
        throw new Error('email cannot be found')
    }
} catch (error) {
    console.error(error)
}
}