const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage(),
    limits: {
        fileSize: 3* 1024* 1024   // means pdf file max 3 mb ki hogi
    }
})

module.exports = upload