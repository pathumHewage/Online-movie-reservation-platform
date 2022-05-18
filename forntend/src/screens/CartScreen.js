import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const ticketId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (ticketId) {
      dispatch(addToCart(ticketId, qty));
    }
  }, [dispatch, ticketId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ color: "white" }}>Ticket Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty
            <Link to="/">Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem
                key={item.ticket}
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      style={{ color: "white" }}
                      to={`/ticket/${item.ticket}`}
                    >
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2}>{item.price} Rs/=</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      style={{ backgroundColor: "black", color: "white" }}
                      onChange={(e) =>
                        dispatch(addToCart(item.ticket, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      style={{ backgroundColor: "black", color: "#00cc00" }}
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.ticket)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem
              style={{ backgroundColor: "black", color: "#00cc00" }}
            >
              <h2>
                Subtotal Tickets (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              Rs/=
            </ListGroupItem>
            <ListGroupItem
              style={{ backgroundColor: "black", color: "#00cc00" }}
            >
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
