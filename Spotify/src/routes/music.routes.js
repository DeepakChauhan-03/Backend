const express = require('express')
const MusicControler = require('../controllers/music.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();



const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage()
})


router.post('/upload',authMiddleware.authArtist,upload.single("music"),MusicControler.createMusic)

router.post('/album',authMiddleware.authArtist, MusicControler.createAlbum)

router.get('/',authMiddleware.authUser,MusicControler.getAllMusics)

router.get('/albums',authMiddleware.authUser,MusicControler.getAllAlbums)

module.exports = router