const shortid = require("shortid");

class Ticket {
  /**
   * Constructor function
   * @param {string} username - username must be a string
   * @param {number} price - price must be a number
   */
  constructor(username, price) {
    this.id = shortid.generate();
    this.username = username;
    this.price = price;
    this.createAt = new Date();
    this.updateAt = new Date();
  }
}

module.exports = Ticket;
