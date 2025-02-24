const Transfer = require('../models/transfer.model')

module.exports.create = (req, res) => {
	res.render('transfer/create', {
		title: 'Transfer',
		csrfToken: req.csrfToken()
	})
}

module.exports.postCreate = async (req, res) => {
	const transfer = new Transfer({
		account: req.body.account,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId
	})

	await transfer.save()

	res.redirect('/transfer/create')
}