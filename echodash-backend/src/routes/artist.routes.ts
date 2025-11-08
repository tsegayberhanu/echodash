import { Router } from 'express'
import { ArtistController } from '../controllers/artist.controller.js'
const router = Router()
router.get('/', ArtistController.getArtists)
router.get('/:artistName', ArtistController.getArtist)

export default router