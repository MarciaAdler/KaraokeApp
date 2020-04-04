import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import { StoreProvider } from "../src/utils/GlobalState";
import Song from "./pages/Song";
import SearchResults from "./pages/SearchResults";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/searchresults" component={SearchResults} />
            <Route exact path="/song" component={Song} />
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
