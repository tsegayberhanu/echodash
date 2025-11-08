import { Router } from "express";
import { GenreController } from "../controllers/genre.controller.js";

const router = Router();

router.get("/", GenreController.getGenres);
router.get("/artists", GenreController.getGenreArtists);
router.get("/:genreName", GenreController.getGenreDetail);

export default router;