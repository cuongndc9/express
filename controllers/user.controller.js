const User = require('../models/user.model')

module.exports.index = async (req, res) => {
	const users = await User.find()

	res.render('users/index', { 
		title: 'Users',
		users: users
	})
}

module.exports.search = async (req, res) => {
	const q = req.query.q;
	const users = await User.find()

	const mathchedUsers = users.filter(
		user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	)
	
	res.render('users/index', {
		title: 'Results',
		users: mathchedUsers,
		q: q
	})
}

module.exports.create = (req, res) => {
	res.render('users/create', { 
		title: 'Create User'
	})
}

module.exports.get = async (req, res) => {
	const id = req.params.id
	const users = await User.find()

	const result = users.find(user => user.id === id)

	res.render('users/view', { 
		title: 'Detail User', 
		user: result 
	})
}

module.exports.postCreate = async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		avatar: req.file.path.split('/').slice(1).join('/')
	})

	await user.save()

	res.redirect('/users')
}