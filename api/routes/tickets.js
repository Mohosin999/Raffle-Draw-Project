const router = require("express").Router();
const Ticket = require("../models/Ticket");

router.post("/sell", async (req, res, next) => {
  const { username, price } = req.body;
  const ticket = new Ticket({ username, price });
  try {
    await ticket.save();
    res.status(201).json({ message: "Created Successfully", ticket });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
