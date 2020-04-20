import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Search from "../components/Search";
import HomeSaved from "../components/HomeSaved";
import { useStoreContext } from "../utils/GlobalState";
export default function Home() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Hero />
      {state.currentUser.id === 0 ? "" : <HomeSaved />}
    </div>
  );
}
