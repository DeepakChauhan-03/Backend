const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const jwt = require('jsonwebtoken')

const {uploadFile} = require('../services/storage.service')

async function createMusic(req,res){ 

   const {title} = req.body;
   const file = req.file;

   const result = await uploadFile(file.buffer.toString('base64'))

   const music = await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id
   })

   res.status(201).json({
    message:"Music created successfully",
    music
   })
 
} 

async function createAlbum(req,res){

     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded.role!=='artist'){
        return res.status(403).json({
            message:"You don't have access to create album"
        })
     }

     const {title , musics} = req.body;
    
     const album = await  albumModel.create({
        title,
        artist:req.user.id,
        musics:musics
     })

     res.status(201).json({
        message:"Album created successfully",
        album
     })

}

async function getAllMusics(req,res){
    const musics = await musicModel.find().populate("artist", "username ")

    res.status(200).json({
      message:"Music fetched successfully",
      musics:musics
    })
}

async function getAllAlbums(req,res){
   const album = await albumModel.find().select("title artist ").populate("artist", "username")

   res.status(200).json({
      message:"Album fetched successfully",
      ablum:album
   })
}

module.exports = {createMusic , createAlbum , getAllMusics, getAllAlbums}