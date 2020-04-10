import React, { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, SET_SAVED_SONGS } from "../utils/actions";
import API from "../utils/API";

export default function Navigation() {
  const [state, dispatch] = useStoreContext();
  
  useEffect(() => {
    if (state.currentUser.id === 0 && localStorage.getItem('currentUser')) {

      const currentUserLs = JSON.parse(localStorage.getItem('currentUser'));

      dispatch({
        type: SET_CURRENT_USER,
        currentUser: currentUserLs
      });

      
      console.log(currentUserLs.id);

      setSaved(currentUserLs.id);

    }
  }, []);

  function setSaved(userId) {
    console.log("setSaved in Nav: ", userId);
    API.getSaved(userId)
      .then((response) => {
        dispatch({
          type: SET_SAVED_SONGS,
          saved: response.data,
        });
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/saved">Saved</Link>

          <Search />

          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </Nav>
      </Navbar>
    </div>
  );
}
