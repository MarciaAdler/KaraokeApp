import React, { useState } from "react";

export default function SavedSong(result) {
  return (
    <div>
      {/* {state.results.length
        ? state.results.map((result) => ( */}
      <div key={result.id}>
        Title: {result.title}
        <br />
        Artist: {result.artist}
        <br />
        Year: {result.year}
        <br />
        Explicit: {result.explicit === 0 ? "false" : "true"}
        <br />
        Duo: {result.duo === 0 ? "false" : "true"}
        <br />
        Styles: {result.styles}
        <br />
        <button
        // onClick={() => {
        //   deleteSong(result);
        // }}
        >
          Select
        </button>
      </div>
      {/* ))
        : "no songs"} */}
      {/* {renderRedirect()} */}
    </div>
  );
}
