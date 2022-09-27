const poolConnection = require("../config/connectDB");

class ProductAgeLimit {
  #age_limit;

  constructor({ age_limit = null}) {
    this.#age_limit = age_limit;
  }

  getAllProductAgeLimit = async () => {
    try {
      const selectQuery = `SELECT * FROM product_age_limit`;
      const [result, _] = await poolConnection.execute(selectQuery);

      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  getProductAgeLimitByAgeLimit = async () => {
    try {
      const selectQuery = `SELECT id as age_limit_id FROM product_age_limit WHERE age_limit = ?;`
      const [result, _ ] = await  poolConnection.execute(selectQuery, [this.#age_limit])
      return result;
    } catch (error) {
      console.error('here error', error.message)
    }
  }

  addProductAgeLimit = async () => {
    try {
      const queryResult = await this.getProductAgeLimitByAgeLimit();
      console.log('age limit', queryResult);
      if(!queryResult) {
        throw new Error('product age limit is already exist');
      }
      const insertQuery = `INSERT INTO product_age_limit (age_limit) VALUES (?);`
      const [result, _ ] = poolConnection.execute(insertQuery, [this.#age_limit]);
      return result;
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = ProductAgeLimit;
