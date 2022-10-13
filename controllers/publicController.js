const Feedback = require("../models/Feedback");
const nodemailer = require('nodemailer');
const MultipleTable = require("../models/MultipleTable");

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
    console.log(result)
} catch (error) {
    console.error(error)
}
}