const Ticket = require("../models/Ticket");

exports.findById = async (req, res, next) => {
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
};

exports.findByUsername = async (req, res, next) => {
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
};

exports.updateById = async (req, res, next) => {
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
};

exports.updateByUsername = async (req, res, next) => {
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
};

exports.deleteById = async (req, res, next) => {
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
};

exports.deleteByUsername = async (req, res, next) => {
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
};

exports.create = async (req, res, next) => {
  const { username, price } = req.body;
  try {
    const ticket = new Ticket({ username, price });
    await ticket.save();
    res.status(201).json({ message: "Created Successfully", ticket });
  } catch (e) {
    console.log(next(e.message));
  }
};

exports.bulkCreate = async (req, res, next) => {
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
};

exports.draw = async (_req, res, next) => {
  try {
    const winner = await Ticket.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(winner);
  } catch (e) {
    console.log(next(e.message));
  }
};

exports.findAllTickets = async (_req, res, next) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets) {
      return res.status(404).json({ message: "Tickets not found" });
    }
    res.status(200).json({ tickets });
  } catch (e) {
    console.log(next(e.message));
  }
};
