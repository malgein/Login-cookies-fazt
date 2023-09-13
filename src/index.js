const  app = require('./app.js')
const connectDB = require('./db.js')

connectDB()
app.listen(3000)
console.log('server on port', 3000)