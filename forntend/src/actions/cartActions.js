import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty, thr) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/tickets/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ticket: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      hall: data.hall,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
