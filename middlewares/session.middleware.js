const nanoid = require('nanoid')

const Session = require('../models/session.model')

module.exports.create = async (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const sessionId = nanoid()
		res.cookie('sessionId', sessionId, { signed: true })
		const session = new Session({
			id: sessionId
		})

		await session.save()
	}

	next()
}

module.exports.totalProducts = async (req, res, next) => {
	const sessionId = req.signedCookies.sessionId
	const session = await Session.findOne({ id: sessionId })

	var total = 0
	if (session) {
		session.cart.forEach(product => total += product.count)
	}
	
	res.locals.total = total

	next()
}