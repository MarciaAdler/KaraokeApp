import React, { useRef, useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { SET_SONG_RESULTS, LOADING, CLEAR_RESULTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function Search(props) {
  const [redirect, setRedirect] = useState(false);
  const songRef = useRef();
  const [state, dispatch] = useStoreContext();
  async function getSongs(songRef) {
    dispatch({ type: LOADING });

    setRedirect(false);

    const { data } = await API.getSongs(songRef);
    console.log("test: ", data);
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        if (i <= data.length) {
          const result = data[i];

          const image = await API.getImage(result);
          result["image"] = image.data.song_art_image_thumbnail_url;
        }

        setRedirect(true);
      }
      dispatch({
        type: SET_SONG_RESULTS,
        results: data,
      });
    } else {
      setRedirect(true);
    }
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
    dispatch({
      type: SET_SONG_RESULTS,
      results: [],
    });
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
