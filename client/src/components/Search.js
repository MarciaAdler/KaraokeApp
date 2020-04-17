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

  // When search bar input's focus is removed on mobile,
  // collapse the search bar
  const hideMobileSearch = () => {
    let searchBar = document.querySelector(".search--container").classList;
    let searchBtn = document.querySelector(".search--mobile-btn").classList;

    if (searchBar.contains("showing-mobile")) {

        // Delay adding this class so CSS transition collapse animation takes effect
        // After user presses the search button on mobile
        setTimeout(function() {
          searchBar.remove('showing-mobile');
          searchBtn.remove('active'); 
          searchBar.add('d-none'); 
      }, 200);
    }
  }

  

  return (
    <div className="text-center text-md-left d-md-block w-100 search--container d-none">
      <Form id="search-bar" inline className="w-100" onSubmit={handleSubmit}>
        <InputGroup className="w-100">
          <FormControl
            id="search-input"
            placeholder="Search for a Song"
            aria-label="Song"
            aria-describedby="basic-addon2"
            onBlur={hideMobileSearch}
            // required
            ref={songRef}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              disabled={state.loading}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {renderRedirect()}
    </div>
  );
}
