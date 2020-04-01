import React, { useRef } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import Search from "../components/Search";
import { SET_SONG_RESULTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#features">Saved</Nav.Link>
          <Nav.Link href="#pricing">Profile</Nav.Link>

          <Search />

          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#signup">Signup</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
