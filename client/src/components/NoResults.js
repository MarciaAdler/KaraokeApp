import React from "react";

export default function NoResults() {
  return (
    <div>
      <h2>
        No results for "
        {window.location.search.replace("?q=", "").replace("%20", " ")}". Please
        search again.
      </h2>
    </div>
  );
}
