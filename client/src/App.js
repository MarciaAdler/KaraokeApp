import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import { StoreProvider } from "../src/utils/GlobalState";
import Song from "./pages/Song";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Navigation />
        {/* <Home /> */}
        
        <Song />
      </StoreProvider>
        
      
    </div>
  );
}

export default App;
