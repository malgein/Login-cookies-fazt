const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const createAccessToken = require('../libs/jwt.js')

const register = async (req, res) => {
		const { username, email, password} = req.body
		// console.log(email, username, password)

	//encripta el password
		const passwordHash = await bcrypt.hash(password, 10)

	try {
		const newUser = new User({
			username,
			email,
			password: passwordHash
		})
		// console.log(newUser)
		//El usuario que es creado pretende ser devuelto aunque no completo
		const newUserSaved = await newUser.save()
		//le pasamos el id del nuevo usuario para que la funcion importada de libs me cree su token
		const token = await createAccessToken({id: newUserSaved._id})
		//funcion que crea el token del usuario
		res.cookie('token', token)
			res.json({
				id: newUserSaved._id,
		 		username: newUserSaved.username,
				email: newUserSaved.email
		})

		//Esta es la forma de obtener para el frontend solo los datos que necesito para el usuario
		//el password no es necesario por eso se excluye del objeto
		// res.json({

		// })
	} catch (error) {
		console.log(error)
	}
	
}

const login = (req, res) => {
	res.send('logeado')
}

module.exports = {
	register,
	login
}