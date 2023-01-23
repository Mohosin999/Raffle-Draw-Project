const router = require("express").Router();
const Ticket = require("../models/Ticket");

/**
 * find a single ticket by the given id
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
 * find a single ticket by the given username
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
 * update ticket by the given id
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
 * update ticket by the given username
 */
router.patch("/u/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { username },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Updated Successfully", updatedTicket });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * delete ticket by the given id
 */
router.delete("/t/:ticketId", async (req, res, next) => {
  const ticketId = req.params.ticketId;
  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(203).json({ message: "Deleted Successfully" });
  } catch (e) {
    console.log(next(e.message));
  }
});

/**
 * delete ticket by the username
 */
router.delete("/u/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    const ticket = await Ticket.findOneAndDelete({ username });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(203).json({ message: "Deleted Successfully" });
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
router.get("/draw", async (_req, res, next) => {
  try {
    const winner = await Ticket.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(winner);
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
