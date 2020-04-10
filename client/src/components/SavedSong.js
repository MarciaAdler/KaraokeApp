import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
export default function SavedSong({ songDetail }) {
  // console.log(songDetail);
  return (
    <div>
      {songDetail.length
        ? songDetail.map((song) => (
            <div key={song.id}>
              <img src={song.image} alt={song.title} />
              Title: {song.title}
              <br />
              Artist: {song.artist}
              <br />
              Year: {song.year}
              <br />
              Explicit: {song.explicit === 0 ? "false" : "true"}
              <br />
              Duo: {song.duo === 0 ? "false" : "true"}
              <br />
              Styles: {song.styles}
              <br />
              <button
              // onClick={() => {
              //   deleteSong(result);
              // }}
              >
                Select
              </button>
            </div>
          ))
        : "no songs"}
      {/* {renderRedirect()} */}
    </div>
  );
}
