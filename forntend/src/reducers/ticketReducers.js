import {
  Ticket_LIST_REQUEST,
  Ticket_LIST_SUCCESS,
  Ticket_LIST_FAIL,
  Ticket_DETAILS_REQUEST,
  Ticket_DETAILS_SUCCESS,
  Ticket_DETAILS_FAIL,
} from "../constants/ticketConstants";

export const ticketListReducer = (
  state = {
    tickets: [],
  },
  action
) => {
  switch (action.type) {
    case Ticket_LIST_REQUEST:
      return { loading: true, tickets: [] };
    case Ticket_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case Ticket_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ticketDetailsReducer = (
  state = {
    ticket: { reviews: [] },
  },
  action
) => {
  switch (action.type) {
    case Ticket_DETAILS_REQUEST:
      return { loading: true, ...state };
    case Ticket_DETAILS_SUCCESS:
      return { loading: false, ticket: action.payload };
    case Ticket_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
