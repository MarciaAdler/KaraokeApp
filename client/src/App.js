import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { StoreProvider } from "../src/utils/GlobalState";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Home />
      </StoreProvider>
    </div>
  );
}

export default App;
