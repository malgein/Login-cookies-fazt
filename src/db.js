// const mongoose  = require('mongoose')

//  const connectDB =  async () => {
//   try{
// 		await mongoose.connect('mongodb://localhost/mernddb')
// 		console.log('Db os connected')
// 	} catch(error){
// 		console.log(error)
// 	}
// }

// module.exports = connectDB

const mongoose  = require('mongoose')

//conexion a mongodb atlas
const dbUrl = "mongodb+srv://malgein17:chevelle_154@cluster0.jqmpd6c.mongodb.net/Login-cookies-fazt?retryWrites=true&w=majority"

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology :true ,
}

const connectDB =  async () => {
  try{
		mongoose.connect(dbUrl, connectionParams)
		console.log('Db is connected')
	} catch(error){
		console.log(error)
	}
}

module.exports = connectDB