import { combineReducers } from "@reduxjs/toolkit"
import songsReducer from "../slices/songs.slice"
import dashboardReducer from "../slices/dashboard.slice"
import statsReducer from "../slices/stats.slice"
import artistsReducer from "../slices/artists.slice"
import artistDetailReducer from "../slices/artistDetail.slice"
import albumsReducer from "../slices/albums.slice"
import albumDetailReducer from "../slices/albumDetail.slice"
import genresReducer from "../slices/genres.slice"
import genreDetailReducer from "../slices/genreDetail.slice"
const rootReducer = combineReducers({
  artists: artistsReducer,
  artistDetail: artistDetailReducer,
  albums: albumsReducer,
  albumDetail: albumDetailReducer,
  songs: songsReducer,
  genres: genresReducer,
  genreDetail: genreDetailReducer,
  stats: statsReducer,
  dashboard: dashboardReducer,
})

export default rootReducer
