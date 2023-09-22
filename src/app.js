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
    //Esto es para que tenga acceso a los headers y que la app pueda leer cookies
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tasksRoutes);


module.exports = app 