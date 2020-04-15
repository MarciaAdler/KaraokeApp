import React, { createContext, useReducer, useContext } from "react";

import {
  SET_SONG_RESULTS,
  CLEAR_ALL,
  SET_CURRENT_SONG,
  SET_CURRENT_USER,
  SET_SAVED_SONGS,
  LOADING,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SONG_RESULTS:
      return {
        ...state,
        results: action.results,
        loading: false,
      };
    case CLEAR_ALL:
      return {
        results: [],
        currentSong: {
          id: 0,
          title: "",
          artist: "",
          duo: 0,
          explicit: 0,
          year: 1984,
          styles: "",
        },
        currentUser: {
          id: 0,
          username: "",
        },
        saved: [],
        loading: false,
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
          styles: action.currentSong.styles,
        },
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.currentUser.id,
          username: action.currentUser.username,
        },
      };
    case SET_SAVED_SONGS:
      return {
        ...state,
        saved: action.saved,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
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
      duo: 0,
      explicit: 0,
      year: 1984,
      styles: "",
    },
    currentUser: {
      id: 0,
      username: "",
    },
    saved: [],
    loading: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
