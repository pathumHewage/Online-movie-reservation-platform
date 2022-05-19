import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ticketListReducer,
  ticketDetailsReducer,
} from "./reducers/ticketReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/userReducer";

import {
  orderCreateReducer,
  // orderDetailsReducer,
  // orderPayReducer,
  // orderDeliverReducer,
  // orderListMyReducer,
  // orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  ticketList: ticketListReducer,
  ticketDetails: ticketDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdatePrf: userUpdateReducer,

  orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderDeliver: orderDeliverReducer,
  // orderListMy: orderListMyReducer,
  // orderList: orderListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const bookingAddressFromStorage = localStorage.getItem('bookingAddress')
  ? JSON.parse(localStorage.getItem('bookingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    bookingAddress: bookingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
