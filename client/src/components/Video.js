import React from "react";

export default function Video(props) {
  return (
    <div className="w-100">
      <iframe
        title={props.video}
        className="w-100 d-block"
        height="315"
        src={`https://www.youtube.com/embed/${props.video}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
