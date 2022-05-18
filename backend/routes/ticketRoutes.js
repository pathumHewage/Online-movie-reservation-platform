import express from "express";

const router = express.Router();
import { getTickets, getTicketById } from "../controllers/ticketController.js";

router.route("/").get(getTickets);
router.route("/:id").get(getTicketById);

export default router;
