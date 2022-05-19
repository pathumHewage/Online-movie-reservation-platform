import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BookingScreen from "./screens/BookingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/booking" component={BookingScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/ticket/:id" component={TicketScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
