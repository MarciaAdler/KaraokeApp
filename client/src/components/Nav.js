import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Search from "../components/Search";

export default function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#features">Saved</Nav.Link>
          <Nav.Link href="#pricing">Profile</Nav.Link>

          <Search />

          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
