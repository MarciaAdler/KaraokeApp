import React from "react";
import API from "../utils/API";

export default function Lyrics(props) {
  return (
    <div>
      {props.lyrics.length
        ? props.lyrics.map(line => <p>{line}</p>)
        : "loading"}
    </div>
  );
}
