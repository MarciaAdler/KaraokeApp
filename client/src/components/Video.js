import React from "react";

export default function Video(props) {
  return (
    <div>
      <iframe
        title={props.video}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.video}`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
