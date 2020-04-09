import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import { StoreProvider } from "../src/utils/GlobalState";
import Song from "./pages/Song";
import SearchResults from "./pages/SearchResults";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/searchresults" component={SearchResults} />
            <Route path="/song" component={Song} />
            <Route path="/saved" component={Saved} />
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
