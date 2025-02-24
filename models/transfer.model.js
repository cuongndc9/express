const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transferSchema = new Schema({
	account: String,
	amount: Number,
	userId: String
})

const Transfer = mongoose.model('Transfer', transferSchema, 'transfers')

module.exports = Transfer