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
      if(result.length <= 0) {
        return null;
      }

      return result;
    } catch (error) {
      console.error('here error', error.message)
    }
  }

  addCategory = async () => {
    try {
      const queryResult = await this.getCategoryByCategoryName();
      console.log('category', queryResult);
      if(!queryResult) {
        const insertQuery = `INSERT INTO product_category (category) VALUES (?);`
        const [result, _ ] = poolConnection.execute(insertQuery, [this.#category]);
        return result;
      }
      throw new Error('category is alredy exist');
      
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = Category;
