import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTicketsDetails } from "../actions/ticketActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./main.css";

const TicketScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const ticketDetails = useSelector((state) => state.ticketDetails);

  const { loading, error, ticket } = ticketDetails;
  useEffect(() => {
    dispatch(listTicketsDetails(match.params.id));
  }, [dispatch, dispatch.match, match.params.id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-black my-3" style={{ color: "white" }}>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={ticket.image} alt={ticket.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem style={{ backgroundColor: "black" }}>
                <h3 style={{ color: "white" }}>{ticket.name}</h3>
              </ListGroupItem>
              <ListGroupItem
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Rating
                  value={ticket.rating}
                  text={`${ticket.numReviews} reviews`}
                ></Rating>
                <hr />
              </ListGroupItem>
              <ListGroupItem
                style={{ backgroundColor: "black", color: "white" }}
              >
                Price: {ticket.price} Rs/=
              </ListGroupItem>

              <ListGroupItem
                style={{ backgroundColor: "black", color: "white" }}
              >
                Release Date: {ticket.date}
              </ListGroupItem>

              <ListGroupItem
                style={{ backgroundColor: "black", color: "white" }}
              >
                Description: <hr /> {ticket.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card style={{ borderColor: "#00cc00" }}>
              <ListGroup variant="flush">
                <ListGroupItem
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>{ticket.price} Rs/=</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {ticket.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>

                {ticket.countInStock > 0 && (
                  <ListGroupItem
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Row>
                      <Col>Qty :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(ticket.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem style={{ backgroundColor: "black" }}>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={ticket.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TicketScreen;
