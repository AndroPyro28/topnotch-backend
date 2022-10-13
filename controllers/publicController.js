const Feedback = require("../models/Feedback");
const MultipleTable = require("../models/MultipleTable");
const gmailSender = require("../helpers/GmailSender");
const {signTokenForEmail} = require('../helpers/AuthTokenHandler')
const generateCode = require('../helpers/GenerateId')
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
    const code = generateCode()
    if(customer?.id) {
        gmailSender(customer?.email, code)
        const type='customer'
        const token = signTokenForEmail(customer.id, code, type);
        const result = await multipleQuery.updateHashReset(token, customer?.id, type)
        console.log({type, result})
    }
    else if(admin?.id) {
        gmailSender(admin?.email, code)
        const type='admin'
        const token = signTokenForEmail(admin.id, code, type);
        const result = await multipleQuery.updateHashReset(token, admin?.id, type)
        console.log({type, result})
    } 
    else {
        throw new Error('email cannot be found')
    }
} catch (error) {
    console.error(error)
}
}