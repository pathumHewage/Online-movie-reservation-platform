import {
  Ticket_LIST_REQUEST,
  Ticket_LIST_SUCCESS,
  Ticket_LIST_FAIL,
  Ticket_DETAILS_REQUEST,
  Ticket_DETAILS_SUCCESS,
  Ticket_DETAILS_FAIL,
} from "../constants/ticketConstants";
import axios from "axios";

export const listTickets = () => async (dispatch) => {
  try {
    dispatch({ type: Ticket_LIST_REQUEST });

    const { data } = await axios.get("/api/tickets");

    dispatch({
      type: Ticket_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Ticket_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTicketsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: Ticket_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: Ticket_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Ticket_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
