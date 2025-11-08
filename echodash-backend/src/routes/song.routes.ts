import { Router } from "express";
import { SongController } from "../controllers/song.controller.js";

const router = Router();

router.post("/", SongController.createSong);
router.get("/", SongController.getSongs);
router.get("/:id", SongController.getSong);
router.patch("/:id", SongController.updateSong);
router.delete("/:id", SongController.deleteSong);

export default router;
