import { Router } from "express";
import { AlbumController } from "../controllers/album.controller.js";

const router = Router();

router.get("/", AlbumController.getAlbums);
router.get("/:albumName", AlbumController.getAlbumDetail);

export default router;
