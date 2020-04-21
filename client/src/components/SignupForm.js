import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

export default function SignupForm() {
  const [state, dispatch] = useStoreContext();
  const [sendLogin, setSendLogin] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const renderRedirect = () => {
    if (sendLogin) {
      return <Redirect to="/" />;
    }
  };
  function signup(event) {
    console.log(nameRef.current.value);
    event.preventDefault();
    if (
      !nameRef.current.value ||
      !passwordRef.current.value ||
      !confirmRef.current.value
    ) {
      return alert("All fields are required");
    } else if (passwordRef.current.value !== confirmRef.current.value) {
      return alert("Passwords must match");
    } else {
      API.createUser({
        username: nameRef.current.value,
        password: passwordRef.current.value,
      })
        .then((res) => {
          setSendLogin(true);
        })
        .catch((err) => alert("Username already exists"));
    }
  }
  return (
    <Form>
      <Form.Group controlId="signupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          required
          ref={nameRef}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="signupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={confirmRef}
        />
      </Form.Group>
      <button className="btn btn-background" type="submit" onClick={signup}>
        Submit
      </button>
      {renderRedirect()}
    </Form>
  );
}
