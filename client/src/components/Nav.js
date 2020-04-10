import React, { useEffect, useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import Search from "../components/Search";
import { Link, Redirect } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, SET_SAVED_SONGS, CLEAR_ALL } from "../utils/actions";
import API from "../utils/API";

export default function Navigation() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  
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

  function logOut() {
    dispatch({
      type: CLEAR_ALL
    });
    localStorage.clear();
    setRedirect(true);
    renderRedirect();
  }

  const renderRedirect = () => {
    if (redirect === true) {
      return <Redirect to="/login" />;
    }
  };


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Navbar</Link></Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/saved">Saved</Link>

          <Search />

          
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Button onClick={logOut}>Logout</Button>
        </Nav>
      </Navbar>
      {renderRedirect()}
    </div>
  );
}
