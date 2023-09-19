const express = require('express')
const morgan = require('morgan')
const authRoutes = require('./routes/auth.routes.js')
//Permite leer las cookies
const cookieParser = require('cookie-parser')
const tasksRoutes = require('./routes/tasks.routes.js')
const cors= require('cors')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tasksRoutes);


module.exports = app 