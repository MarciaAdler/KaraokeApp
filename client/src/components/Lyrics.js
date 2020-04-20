import React from "react";
import API from "../utils/API";

export default function Lyrics(props) {
  return (
    <div className="current-song--lyrics">
      {props.lyrics.length
        ? props.lyrics.map((line, index) => <p key={index}>{line}</p>)
        : "loading"}
      <a target="_blank" href={`https://genius.com${props.path}`}>
        <button className="btn-outline-secondary current-song--btn-lyrics">
          Click here for full lyrics
        </button>
      </a>
    </div>
  );
}
