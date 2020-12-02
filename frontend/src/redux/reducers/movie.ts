import { AsyncAction } from "../types";
import { UPDATE_MOVIE_LIST, UPDATE_MOVIE_WANTED_LIST } from "../constants";

import { mapToAsyncState } from "./mapper";

import { handleActions } from "redux-actions";

const reducer = handleActions<MovieState, any>(
  {
    [UPDATE_MOVIE_LIST]: {
      next(state, action: AsyncAction<Movie[]>) {
        return {
          ...state,
          movieList: mapToAsyncState(action, state.movieList.items),
        };
      },
    },
    [UPDATE_MOVIE_WANTED_LIST]: {
      next(state, action: AsyncAction<WantedMovie[]>) {
        return {
          ...state,
          wantedMovieList: mapToAsyncState(action, state.movieList.items),
        }
      }
    }
  },
  {
    movieList: { updating: false, items: [] },
    wantedMovieList: { updating: false, items: [] },
  }
);

export default reducer;
