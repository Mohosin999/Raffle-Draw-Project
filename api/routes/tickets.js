const router = require("express").Router();
const {
  findById,
  findByUsername,
  updateById,
  updateByUsername,
  deleteById,
  deleteByUsername,
  create,
  bulkCreate,
  draw,
  findAllTickets,
} = require("../controller/tickets");
const Ticket = require("../models/Ticket");

/**
 * find a single ticket by the given id
 */
router.get("/t/:ticketId", findById);

/**
 * find a single ticket by the given username
 */
router.get("/u/:username", findByUsername);

/**
 * update ticket by the given id
 */
router.patch("/t/:ticketId", updateById);

/**
 * update ticket by the given username
 */
router.patch("/u/:username", updateByUsername);

/**
 * delete ticket by the given id
 */
router.delete("/t/:ticketId", deleteById);

/**
 * delete ticket by the username
 */
router.delete("/u/:username", deleteByUsername);

/**
 * create a single ticket
 */
router.post("/sell", create);

/**
 * create multiple ticket for a single user
 */
router.post("/bulk", bulkCreate);

/**
 * draw
 */
router.get("/draw", draw);

/**
 * show all tickets
 */
router.get("/", findAllTickets);

module.exports = router;

// const router = require("express").Router();
// const db = require("../db/db");

// router.get("/t/:ticketId", (req, res) => {
//   const ticketId = req.params.ticketId;
//   const ticket = db.findById(ticketId);
//   res.status(200).json(ticket);
// });

// router.patch("/t/:ticketId", (req, res) => {
//   const ticketId = req.params.ticketId;
//   const updatedTicket = db.updateById(ticketId, req.body);
//   res.status(200).json({ message: "Update Successfully", updatedTicket });
// });

// router.delete("/t/:ticketId", (req, res) => {
//   const ticketId = req.params.ticketId;
//   db.deleteById(ticketId);
//   res.status(203).send();
// });

// router.get("/u/:username", (req, res) => {
//   const username = req.params.username;
//   const tickets = db.findByUsername(username);
//   res.status(200).json(tickets);
// });

// router.post("/sell", (req, res) => {
//   const { username, price } = req.body;
//   const ticket = db.create(username, price);
//   res.status(201).json({ message: "Ticket created successfully", ticket });
// });

// router.post("/bulk", (req, res) => {
//   const { username, price, quantity } = req.body;
//   const tickets = db.bulkCreate(username, price, quantity);
//   res
//     .status(201)
//     .json({ message: "Bulk ticket created successfully", tickets });
// });

// router.get("/draw", (req, res) => {
//   const winnerCount = req.query.wc ?? 3;
//   const winners = db.draw(winnerCount);
//   res.status(200).json(winners);
// });

// router.get("", (_req, res) => {
//   const tickets = db.find();
//   res.status(200).json(tickets);
// });

// module.exports = router;
