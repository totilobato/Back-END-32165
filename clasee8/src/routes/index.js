const { Router } = require('express')
const router = Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}- ${file.fieldname}`)
    }
})

const upload = multer({storage})

router.post('/uploadFile', upload.single('myFile'), (req, res) => {
    const file = req.file
    if(!file) {
        throw Error ('Nothing Uploaded')
    }
    res.send(file)
})

router.get('/', (_req, res) => {
    res.sendFile(__dirname + '../public/index.html')
})