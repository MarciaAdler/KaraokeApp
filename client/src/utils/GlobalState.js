import React, { createContext, useReducer, useContext } from "react";

import { SET_SONG_RESULTS, CLEAR_RESULTS, SET_CURRENT_SONG } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SONG_RESULTS:
      return {
        ...state,
        results: action.results,
        loading: false
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        loading: false
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: {
          id: state.id,
          title: state.title,
          artist: state.artist,
          year: state.artist,
          styles: state.styles
        },
        loading: false
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    results: [],
    currentSong: {
      id: "",
      title: "",
      artist: "",
      year: "",
      styles: ""
    },
    saved: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
