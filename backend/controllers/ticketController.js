import AsyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";

const getTickets = AsyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  res.json(tickets);
});

const getTicketById = AsyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket Not Found");
  }
});

export { getTickets, getTicketById };
