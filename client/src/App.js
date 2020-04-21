import React from "react";
import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { StoreProvider } from "../src/utils/GlobalState";
import Song from "./pages/Song";
import SearchResults from "./pages/SearchResults";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./pages/Login";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Saved from "./pages/Saved";
import "./App.sass";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route path="/searchresults" component={SearchResults} />
            <Route path="/song" component={Song} />
            <Route path="/saved" component={Saved} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </StoreProvider>
      <Footer />
    </div>
  );
}

export default App;
