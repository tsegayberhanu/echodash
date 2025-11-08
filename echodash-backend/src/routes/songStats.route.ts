import { Router } from "express";
import { SongStatsController } from "../controllers/songStats.controller.js";
import { GenreController } from "../controllers/genre.controller.js";
import { AlbumController } from "../controllers/album.controller.js";
import { ArtistController } from "../controllers/artist.controller.js";
import { SongController } from "../controllers/song.controller.js";

const router = Router();

router.get("/", SongStatsController.homeStats);

router.get("/artists", SongStatsController.getAllArtistStats);
router.get("/artists/top-artists", ArtistController.getTopArtists);
router.get("/artists/:artist", SongStatsController.getArtistStats);

router.get("/albums", SongStatsController.getAllAlbumStats);
router.get("/albums/top-albums", AlbumController.getTopAlbums);
router.get("/albums/:album", SongStatsController.getAlbumStats);

router.get("/genres", SongStatsController.getAllGenreStats);
router.get("/genres/top-genres", GenreController.getTopGenres);
router.get("/genres/:genre", SongStatsController.getGenreStats);

router.get("/songs/recent-songs", SongController.getRecentSongs)

export default router;
