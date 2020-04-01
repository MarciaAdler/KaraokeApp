import React, { useRef } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { SET_SONG_RESULTS, LOADING } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
export default function Search() {
  const songRef = useRef();
  const [state, dispatch] = useStoreContext();
  function getSongs(songRef) {
    console.log(songRef);
    dispatch({ type: LOADING });
    API.getSongs(songRef)
      .then(results => {
        console.log(results.data.message.body.track_list);

        // dispatch({
        //   type: SET_SONG_RESULTS,
        //   results: results.data
        // });
      })
      .catch(err => console.log(err));
  }
  const handleSubmit = e => {
    e.preventDefault();
    console.log(songRef.current.value);
    getSongs(songRef.current.value);
  };
  return (
    <div>
      <Form inline>
        <InputGroup className="mb-3">
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
    </div>
  );
}
