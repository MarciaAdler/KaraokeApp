import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_CURRENT_USER, SET_SAVED_SONGS } from "../utils/actions";
import { Redirect } from "react-router-dom";

export default function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const renderRedirect = () => {
    if (loggedIn) {
      return <Redirect to="/" />;
    }
  };
  function setSaved(userId) {
    API.getSaved(userId)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: SET_SAVED_SONGS,
          saved: response.data,
        });
      })
      .catch((err) => console.log(err));
  }
  function login(event) {
    event.preventDefault();
    console.log(nameRef.current.value);
    API.getUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((results) => {
        console.log(results.data);
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
          },
        });

        setLoggedIn(true);
        setSaved(results.data.id);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Form>
      <Form.Group controlId="loginUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" ref={nameRef} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="loginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={login}>
        Submit
      </Button>
      {renderRedirect()}
    </Form>
  );
}
