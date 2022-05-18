import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getUserDetails, updateUserPrf } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatePrf = useSelector((state) => state.userUpdatePrf);
  const { success } = userUpdatePrf;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserPrf({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2 style={{ color: "white" }}>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label style={{ color: "white" }}>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="email">
            <Form.Label style={{ color: "white" }}>Email Adderess</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="password">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="confirmPassword">
            <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <hr style={{ color: "white" }} />
          <Button
            style={{ backgroundColor: "#00cc00", color: "white" }}
            type="submit"
            variant=" primary"
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2 style={{ color: "white" }}>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
