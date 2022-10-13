const Feedback = require("../models/Feedback");
const MultipleTable = require("../models/MultipleTable");
const gmailSender = require("../helpers/GmailSender");
const { signTokenForEmail, verifyToken } = require("../helpers/AuthTokenHandler");
const generateCode = require("../helpers/GenerateId");

module.exports.getFirstThreeFeedback = async (req, res) => {
  try {
    const feedbackModel = new Feedback({});
    const result = await feedbackModel.getFirstThreeFeedback();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      msg: error.message,
      success: false,
    });
  }
};

module.exports.findAccountAndSendCode = async (req, res) => {
  try {
    const multipleQuery = new MultipleTable();
    const { email } = req.body.values;
    const result = await multipleQuery.findEmail(email);
    const customer = result[0][0];
    const admin = result[1][0];
    const code = generateCode()();
    if (customer?.id) {
      gmailSender(customer?.email, code);
      const type = "customer";
      const token = signTokenForEmail(customer.id, code, type);
      const result = await multipleQuery.updateHashReset(
        token,
        customer?.id,
        type
      );
      console.log({ type, result });
      return res.status(200).json({
        msg: "Code has been sent to your email.",
      });
    } else if (admin?.id) {
      gmailSender(admin?.email, code);
      const type = "admin";
      const token = signTokenForEmail(admin.id, code, type);
      const result = await multipleQuery.updateHashReset(
        token,
        admin?.id,
        type
      );
      console.log({ type, result });
      return res.status(200).json({
        msg: "Code has been sent to your email.",
        success: true,
      });
    } else {
      throw new Error("email cannot be found");
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      msg: error.message,
      success: false,
    });
  }
};

module.exports.verifyCode = async () => {
  try {
    const { email, code } = req.body.values;
    const multipleQuery = new MultipleTable();
    const result = await multipleQuery.findEmail(email);
    const customer = result[0][0];
    const admin = result[1][0];

    if(customer?.id) {
        const decoded = verifyToken(customer?.passwordResetToken);

        if(decoded.code == code && decoded?.id == customer?.id && decoded?.userType == 'customer') {
            multipleQuery.removeHashReset(decoded?.userType, customer?.id);
            const token = signTokenForEmail(customer.id, decoded?.userType);
            return res.status(200).json({
                reset_token: token,
                success:true
            })
        }

    } else if(admin?.id) {
        const decoded = verifyToken(admin?.passwordResetToken);
        if(decoded.code == code && decoded?.id == customer?.id && decoded?.userType == 'admin') {
            multipleQuery.removeHashReset(decoded?.userType, admin?.id);
            const token = signTokenForEmail(admin.id, decoded?.userType);
            return res.status(200).json({
                reset_token: token,
                success:true
            })    
        }
    } else {
        throw new Error('Invalid code or invalid email detected')
    }
  } catch (error) {
    console.error(error)
    return res.status(200).json({
        msg: error.message,
        success: false,
      });
  }
};
