import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form } from "react-bootstrap";
import API from "../utils/API";
import { SET_CURRENT_USER, SET_SAVED_SONGS } from "../utils/actions";
import { Redirect, Link } from "react-router-dom";

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
    if (userId !== 0) {
      API.getSaved(userId)
        .then((response) => {
          dispatch({
            type: SET_SAVED_SONGS,
            saved: response.data,
          });
          window.localStorage.setItem(
            "savedSongs",
            JSON.stringify(response.data)
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function login(event) {
    event.preventDefault();
    API.getUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((results) => {
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
          },
        });

        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
        };

        
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );
        setSaved(results.data.id);
        setLoggedIn(true);
        
        
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Form>
        <Form.Group controlId="loginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={nameRef}
          />
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
        <button
          className="btn btn-outline-secondary"
          type="submit"
          onClick={login}
        >
          Submit
        </button>
        <small>
          {" "}
          &nbsp; No account?
          <Link push to="/signup">
            &nbsp;Click here
          </Link>
          &nbsp;to signup
        </small>
      </Form>
      {renderRedirect()}
    </div>
  );
}
