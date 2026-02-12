const { ImageKit } = require('@imagekit/nodejs');
const dotenv = require('dotenv')
dotenv.config()

const imagekit = new ImageKit({
    privateKey: process.env.PRIVATE_KEY
})
async function uploadFile(file){
  const result = await imagekit.files.upload({
    file:file.buffer.toString("base64"),
    fileName:file.originalname
  })

  return result
}

module.exports = uploadFile;