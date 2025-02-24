const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const perPage = 9
	const start = (page - 1) * perPage
	const end = page * perPage

	const pages = []
	const totalItems = (await Product.find()).length
	const lastPage = Math.ceil(totalItems / perPage)
	var disabledPage = 0 // 0: not, -1: previous, 1: next

	if (page === 1) {
		pages.push(1, 2 , 3)
		disabledPage = -1
	}

	if (page === lastPage) {
		pages.push(page - 2, page - 1, page)
		disabledPage = 1
	}

	if (page > 1 && page < lastPage) {
		pages.push(page - 1, page, page + 1)
	}

	const products = await Product.find()

	res.render('products/index', {
		title: 'Products',
		products: products.slice(start, end),
		pages: pages,
		activePage: page,
		disabledPage: disabledPage
	})
}