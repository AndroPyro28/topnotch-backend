const poolConnection = require("../config/connectDB");

class Category {
  #category;

  constructor({ category = null}) {
    this.#category = category;
  }

  getAllCategory = async () => {
    try {
      const selectQuery = `SELECT * FROM product_category`;
      const [result, _] = await poolConnection.execute(selectQuery);

      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  getCategoryByCategoryName = async () => {
    try {
      const selectQuery = `SELECT id as category_id FROM product_category WHERE category = ?;`
      const [result, _ ] = await  poolConnection.execute(selectQuery, [this.#category])
      return result;
    } catch (error) {
      console.error('here error', error.message)
    }
  }

  addCategory = async () => {
    try {
      const queryResult = await this.getCategoryByCategoryName();
      const {category_id} = queryResult[0]
      if(category_id) {
        throw new Error('category is alredy exist');
      }
      const insertQuery = `INSERT INTO product_category (category) VALUES (?);`
      const [result, _ ] = poolConnection.execute(insertQuery, [this.#category]);
      return result;
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = Category;
