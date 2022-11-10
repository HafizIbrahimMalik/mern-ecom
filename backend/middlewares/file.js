const multer = require('multer')   //A Pkg to handle files for node

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'png',
}
const storage = multer.diskStorage({     //this tells how multer does store things
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]   //to make filetype validation in backend   . mime type is simple the extension type so here we are getting ext from "file.mimetype" and then checking if it allowed ext in our const MIME_TYPE_MAP
    let error = Error('Invalid mime type')
    if (isValid) {
      error = null
    }
    cb(null, "backend/images")   //this path is releative to server.js file so file will store in backend/images
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
})


module.exports = multer({ storage: storage }).single('image')
