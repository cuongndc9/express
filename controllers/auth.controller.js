const bcrypt = require('bcrypt')

const User = require('../models/user.model')

module.exports.login = (req, res) => {
	res.render('auth/login', { title: 'Login' })
}

module.exports.postLogin = async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email: email })

	if (!user) {
		res.render('auth/login', {
			title: 'Login',
			errors: [
				'User does not exists.'
			],
			values: req.body
		})
		return;
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		res.render('auth/login', {
			title: 'Login',
			errors: [
				'Wrong password.'
			],
			values: req.body
		})
	return;
	}

	res.cookie('userId', user.id, { signed: true })
	res.redirect('/users')
}