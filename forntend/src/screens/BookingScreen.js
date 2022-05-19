import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveBookingAddress } from '../actions/cartActions'

const BookingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { bookingAddress } = cart

  const [email, setEmail] = useState(bookingAddress.email)
  const [payer, setPayer] = useState(bookingAddress.payer)
  const [phone1, setPhone1] = useState(bookingAddress.phone1)
  const [exPhone2, setexPhone2] = useState(bookingAddress.exPhone2)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveBookingAddress({ email, payer, phone1, exPhone2 }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <div style={{ color: "white" }}><CheckoutSteps step1 step2 /></div>
      <h1 style={{ color: "white" }}>Booking</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label style={{ color: "white" }}>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        
        <Form.Group controlId='payer'>
          <Form.Label style={{ color: "white" }}>Payer Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Payer'
            value={payer}
            required
            onChange={(e) => setPayer(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        
        <Form.Group controlId='phone1'>
          <Form.Label style={{ color: "white" }}>Phone Number 1</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Phone1'
            value={phone1}
            required
            onChange={(e) => setPhone1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='exPhone2'>
          <Form.Label style={{ color: "white" }}>Phone Number 2</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Phone2'
            value={exPhone2}
            required
            onChange={(e) => setexPhone2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br /><br />
              
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default BookingScreen;

