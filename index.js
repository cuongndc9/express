require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const transferRoute = require('./routes/transfer.route')

const apiProductRoute = require('./api/routes/product.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware.create)
app.use(sessionMiddleware.totalProducts)

app.use(express.static('public'))
app.use('/users', express.static('public'))

app.get('/', (req, res) => res.render('index', { title: 'Home' }))

app.use('/auth', authRoute)
app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/transfer', transferRoute)
app.use('/transfer/create', csrf({ cookie: true }))

app.use('/api/products', apiProductRoute)

app.listen(port, () => console.log(`Listening on port ${port}`))