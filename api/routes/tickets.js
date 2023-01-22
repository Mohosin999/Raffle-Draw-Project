const router = require("express").Router();
const Ticket = require("../models/Ticket");

/**
 * find ticket by given id
 */
router.get("/t/:ticketId", async (req, res, next) => {
  const ticketId = req.params.ticketId;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ ticket });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * update ticket by given id
 */
router.patch("/t/:ticketId", async (req, res, next) => {
  const ticketId = req.params.ticketId;
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Updated Successfully", updatedTicket });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * delete ticket by given id
 */
router.delete("/t/:ticketId", async (req, res, next) => {
  const ticketId = req.params.ticketId;
  try {
    await Ticket.findByIdAndDelete(ticketId);
    res.status(203).json({ message: "Deleted Successfully" });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * delete ticket by username
 */
router.delete("/u/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    await Ticket.findOneAndDelete({ username });
    res.status(203).json({ message: "Deleted Successfully" });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * find ticket by username
 */
router.get("/u/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    const ticket = await Ticket.findOne({ username });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ ticket });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * create a single ticket
 */
router.post("/sell", async (req, res, next) => {
  const { username, price } = req.body;
  try {
    const ticket = new Ticket({ username, price });
    await ticket.save();
    res.status(201).json({ message: "Created Successfully", ticket });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * create multiple ticket for a single user
 */
router.post("/bulk", async (req, res, next) => {
  const { username, price, quantity } = req.body;
  try {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      tickets.push({ username, price });
    }
    const result = await Ticket.insertMany(tickets);
    if (!result) {
      return res.status(404).json({ message: "Ticket not created" });
    }
    res.status(201).json({ message: "Created Successfully", result });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * draw
 */
router.get("/draw", async (req, res, next) => {
  try {
    const winnerCount = parseInt(req.query.wc) || 3;
    const winners = await Ticket.aggregate([
      { $sample: { size: winnerCount } },
    ]);
    res.status(200).json(winners);
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * show all tickets
 */
router.get("/", async (_req, res, next) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets) {
      return res.status(404).json({ message: "Tickets not found" });
    }
    res.status(200).json({ tickets });
  } catch (e) {
    console.log(next(e.message));
  }
});

module.exports = router;
