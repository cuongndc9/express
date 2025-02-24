const express = require('express')
const multer  = require('multer')

const router = express.Router()
const upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/user.controller')
const validate = require('../validate/user.validate')

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.get)

router.post(
	'/create', 
	upload.single('avatar'), 
	validate.postCreate, 
	controller.postCreate
)

module.exports = router