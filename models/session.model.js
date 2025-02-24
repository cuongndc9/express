const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
	id: String,
	cart: [{ 
		productId: String,
		count: Number
	}]
})

const Session = mongoose.model('Session', sessionSchema, 'sessions')

module.exports = Session