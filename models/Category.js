const poolConnection = require("../config/connectDB");

class Category {
  #category;

  constructor({ category = null}) {
    this.#category = category;
  }

  getAllCategory = async () => {
    try {
      const selectQuery = `SELECT category FROM category c`;
      const [result, _] = await poolConnection.execute(selectQuery);

      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  addCategory = async () => {
    try {
      const insertQuery = `INSERT INTO category (category) VALUES (?);`
      const [result, _ ] = poolConnection.execute(insertQuery, [this.#category]);
      return result;
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = Category;
