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
    if (state.currentUser.id === 0 && localStorage.getItem("currentUser")) {
      const currentUserLs = JSON.parse(localStorage.getItem("currentUser"));

      dispatch({
        type: SET_CURRENT_USER,
        currentUser: currentUserLs,
      });

      // console.log(currentUserLs.id);

      setSaved(currentUserLs.id);
    } else if (state.currentUser.id !== 0) {
      setSaved(state.currentUser.id);
    }
  }, []);

  function setSaved(userId) {
    // console.log("setSaved in Nav: ", userId);
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
      type: CLEAR_ALL,
    });
    localStorage.clear();
    setRedirect(true);
    renderRedirect();
  }

  const renderRedirect = () => {
    if (redirect === true) {
      return <Redirect to="/" />;
    }
  };

  // Function to toggle showing the search bar on mobile from the navigation bar
  const showSearchInput = () => {
    let searchBar = document.querySelector(".search--container").classList;
    let searchBtn = document.querySelector(".search--mobile-btn").classList;
    let searchInput = document.querySelector("#search-input");

    if (searchBar.contains("d-none")) {
      // If the search bar is hidden, clicking on the Search button expands search bar
      searchBar.remove("d-none");
      searchBtn.add("active");
      searchInput.focus();

      // Delay adding this class so CSS transition expand animation takes effect
      setTimeout(function () {
        searchBar.add("showing-mobile");
      }, 100);
    } else {
      // If the search bar is showing, clicking on the Search button collapses search bar
      searchBar.remove("showing-mobile");
      searchBtn.remove("active");

      // Delay adding this class so CSS transition collapse animation takes effect
      setTimeout(function () {
        searchBar.add("d-none");
      }, 200);
    }
  };

  return (
    <div>
      <Navbar className="navbar--container fixed-top">
        <Navbar.Brand className="col-4 pl-0">
          <Link to="/">
            <img
              className="navbar--logo d-none d-sm-block"
              src={require("../img/logo-white.png")}
              alt="SingAlong Karaoke"
            />
            <img
              className="navbar--logo d-block d-sm-none"
              src={require("../img/logo-white-short.png")}
              alt="SingAlong Karaoke"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="justify-content-center col">
          <span
            onClick={showSearchInput}
            className="search--mobile-btn d-inline-block d-md-none"
          >
            <i className="fas fa-search"></i>&nbsp;Search
          </span>

          <Search />
        </Nav>

        {state.currentUser.id === 0 ? (
          <Nav className="justify-content-end col-4 pr-0">
            <Link to="/" className="mr-4">
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </Nav>
        ) : (
          <Nav className="justify-content-end col-4 pr-0">
            <Link to="/saved" className="mr-4">
              <i className="fas fa-star"></i>&nbsp;Saved
            </Link>
            <Link to="/" onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
            </Link>
          </Nav>
        )}
      </Navbar>
      {renderRedirect()}
    </div>
  );
}
