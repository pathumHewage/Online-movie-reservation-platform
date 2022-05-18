import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Ticket from "../components/Ticket";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listTickets } from "../actions/ticketActions";
import "./main.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.ticketList);

  const { loading, error, tickets } = ticketList;

  useEffect(() => {
    dispatch(listTickets());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ color: "white" }}>New Movies</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {tickets.map((ticket) => (
            <Col key={ticket._id} sm={12} md={6} lg={4} xl={3}>
              <Ticket ticket={ticket} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
