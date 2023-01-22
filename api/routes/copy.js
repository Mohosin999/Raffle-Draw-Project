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

const router = require("express").Router();
const db = require("../db/db");

router.get("/t/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await db.findById(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/t/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const updatedTicket = await db.updateById(ticketId, req.body);
    res.status(200).json({ message: "Update Successfully", updatedTicket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/t/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    await db.deleteById(ticketId);
    res.status(203).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/u/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const tickets = await db.findByUsername(username);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sell", async (req, res) => {
  try {
    const { username, price } = req.body;
    const ticket = await db.create(username, price);
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const { username, price, quantity } = req.body;
    const tickets = await db.bulkCreate(username, price, quantity);
    res
      .status(201)
      .json({ message: "Bulk ticket created successfully", tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/draw", async (req, res) => {
  try {
    const winnerCount = req.query.wc ?? 3;
    const winners = await db.draw(winnerCount);
    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const tickets = await db.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
