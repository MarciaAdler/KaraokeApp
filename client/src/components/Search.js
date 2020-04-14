import React, { useRef, useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { SET_SONG_RESULTS, LOADING, CLEAR_RESULTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function Search() {
  const [redirect, setRedirect] = useState(false);
  const songRef = useRef();
  const [state, dispatch] = useStoreContext();
  function getSongs(songRef) {
    let resultsArr = []
    console.log(songRef);
    dispatch({ type: LOADING });
    setRedirect(false);
    API.getSongs(songRef)
      .then((results) => {
        resultsArr = results.data;
        resultsArr.map((result) => {
            API.getImage(result).then(image => {
              result["image"] = image.data.song_art_image_thumbnail_url;
            })
            .catch((err) => console.log(err));
            return result;
          });

      })
      .then(() => {
        console.log("resultsArr before dispatch", resultsArr);
        dispatch({
          type: SET_SONG_RESULTS,
          results: resultsArr,
        });
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  }

  const renderRedirect = () => {
    if (state.results && redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/searchresults",
            search: `?q=${songRef.current.value}`,
          }}
        />
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(songRef.current.value);
    getSongs(songRef.current.value);
  };


  return (
    <div className="w-100">
      <Form inline className="w-100" onSubmit={handleSubmit}>
        <InputGroup className="w-100">
          <FormControl
            placeholder="Search for a Song"
            aria-label="Song"
            aria-describedby="basic-addon2"
            // required
            ref={songRef}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              disabled={state.loading}
              onClick={handleSubmit}
            >
              Button
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {renderRedirect()}
    </div>
  );
}
