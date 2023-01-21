const Ticket = require("../models/Ticket");

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * Create and save a new ticket
   * @param {string} username - username must be a string
   * @param {number} price - price must be a number
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * Create multiple tickets for a single user
   * @param {string} username - username must be a string
   * @param {number} price - price must be a number
   * @param {number} quantity - quantity must be a number
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }

    return result;
  }

  /**
   * Returns all available tickets
   */
  find() {
    return this.tickets;
  }

  /**
   * Find ticket by ticket id
   * @param {string} ticketId - ticketId must be a string
   */
  findById(ticketId) {
    const ticket = this.tickets.find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );

    return ticket;
  }

  /**
   * Find ticket by a given user
   * @param {string} username - username must be a string
   */
  findByUsername(username) {
    const tickets = this.tickets.filter(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );

    return tickets;
  }

  /**
   * Update ticket by a given id
   * @param {string} ticketId - ticketId must be a string
   * @param {{username: string, price:number}} ticketBody - username: string, price: number
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updateAt = new Date();
    return ticket;
  }

  /**
   * Delete ticket by given id
   * @param {string} ticketId - ticketId must be string
   */
  deleteById(ticketId) {
    // to get index
    const index = this.tickets.findIndex(
      /**
       *@param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Find winner
   * @param {number} winnerCount - winnerCount must be a number
   */
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);

    let index = 0;
    while (index < winnerCount) {
      // winnerIndex gives only index like 0 or 1 or 2 ...
      const winnerIndex = Math.floor(Math.random() * this.tickets.length);
      if (!winnerIndexes.includes(winnerIndex)) {
        winnerIndexes[index++];
        continue;
      }
    }

    // get actual winners by mapping index
    const winners = winnerIndexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();

module.exports = myDB;
