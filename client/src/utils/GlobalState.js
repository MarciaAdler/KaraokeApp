import React, { createContext, useReducer, useContext } from "react";

import { SET_SONG_RESULTS } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SONG_RESULTS:
      return {
        ...state,
        currentSong: action.song,
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
      id: 0,
      title: "",
      artist: ""
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
