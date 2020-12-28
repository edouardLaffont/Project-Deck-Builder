const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getOneCard: function (id, callback) {
    const query = {
      text: `SELECT * FROM "card" WHERE "id" = $1`,
      values: [id]
    }
    database.query(query, callback);
  },

  getCardsByExactProperty: function (property, value, callback) {
    const query = {
      text: `SELECT * FROM "card" WHERE ${property} = $1`,
      values: [value]
    }

    // le petit piège :) 
    if (value == "null") {
      query = {
        text: `SELECT * FROM "card" WHERE ${property} IS NULL`
      }
    }
    
    database.query(query, callback);
  },

  getCardsByValue: function (direction, value, callback) {
    const query = {
      text: `SELECT * FROM "card" WHERE "value_${direction}" = $1`,
      values: [value]
    }
    database.query(query, callback);
  },

  getCardsByName: function (value, callback) {
    const query = {
      name: "getCardsByName",
      text: `SELECT * FROM "card" WHERE "name" LIKE $1`,
      values: [`%${value}%`]
    }
    database.query(query, callback);
  }
};


module.exports = dataMapper;