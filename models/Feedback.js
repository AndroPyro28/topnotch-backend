const poolConnection = require("../config/connectDB");

class Feedback {
  #customer_id;
  #comments;
  #ratings;

  constructor({ customer_id = null, comments = null, ratings = null }) {
    this.#comments = comments;
    this.#ratings = ratings;
    this.#customer_id = customer_id;
  }

  getAllFeedback = async () => {
    try {
      const selectQuery = `SELECT * FROM feedback`;
      const [result, _] = await poolConnection.execute(selectQuery);

      return result;
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = Feedback;
