const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
		const { username, email, password} = req.body
		// console.log(email, username, password)


		const passwordHash = await bcrypt.hash(password, 10)

	try {
		const newUser = new User({
			username,
			email,
			password: passwordHash
		})
		// console.log(newUser)

		const newUserSaved = await newUser.save()

		//Esta es la forma de obtener para el frontend solo los datos que necesito para el usuario
		//el password no es necesario por eso se excluye del objeto
		res.json({
			id: newUserSaved.id,
			username: newUserSaved.username,
			email: newUserSaved.email
		})
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