const Feedback = require("../models/Feedback");

module.exports.getFirstThreeFeedback = async (req, res) => {
    try {
        const feedbackModel = new Feedback({});
        const result = await feedbackModel.getFirstThreeFeedback();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message)
    }
}