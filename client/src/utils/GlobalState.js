import React, { createContext, useReducer, useContext } from "react";

import {
  SET_SONG_RESULTS,
  CLEAR_RESULTS,
  SET_CURRENT_SONG,
  SET_CURRENT_USER
} from "./actions";

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
          id: action.currentSong.id,
          title: action.currentSong.title,
          artist: action.currentSong.artist,
          year: action.currentSong.year,
          duo: action.currentSong.duo,
          explicit: action.currentSong.explicit,
          styles: action.currentSong.styles
        },
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
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
      artist: "",
      year: 1984,
      styles: ""
    },
    currentUser: "",
    saved: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
