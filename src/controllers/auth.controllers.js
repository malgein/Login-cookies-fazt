const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const createAccessToken = require('../libs/jwt.js')
//para verificar los tokens
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require('../config')


const register = async (req, res) => {
		const { username, email, password} = req.body
		// console.log(email, username, password)

	//encripta el password
		const passwordHash = await bcrypt.hash(password, 10)

	try {

		//guardamos en una constante un valor si el correo del usuario existe
		const userFound = await User.findOne({ email})

		//Si esa variable que guarda el correo del usuario que esta resgitrando existe, es decir lo haya en la base de datos envia un mensaje de error de el email ya existe
		if(userFound) return res.status(400).json([ 'email already exists'])

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
			res.status(500).json({ message: error.message });
	}
	
}

const login = async(req, res) => {
	//estrae el email y pass que el usuario introduce
	const { email, password} = req.body
	
	try {
	
	//Buscar en la BD un usuario por el email ingresado, si no lo encuantra imprime not found
	const userFound = await User.findOne({ email})
	if(!userFound) return res.status(400).json({ message: 'user not found'})
	
	//encripta el password y lo guarda en isMatch
		const isMatch = await bcrypt.compare(password, userFound.password)
	//si isMatch es false quiere decir que no es la misma que el usuario envio con la de la bd asi que envia invalid pass
		if(!isMatch) return res.status(400).json({message: 'invalid password'})
	
	//le pasamos el id del nuevo usuario para que la funcion importada de libs me cree su token sobre el usuario que encntramos en la BD
	const token = await createAccessToken({id: userFound._id})
	//finalmente devuelve el usuario que seria el que ya esta logeado
	//le dice al navegador que la cookie vendra de un dominio diferente al del frontend
	res.cookie('token', token, {
		sameSite: "none",
		secure: true,
		httpOnly: false
	})
		res.json({
			id: userFound._id,
			username: userFound.username,
			email: userFound.email
	})
} catch (error) {
		res.status(500).json({ message: error.message });
}

}

//controlador que borra la cooike con el token de acceso al volver a ingresar a profile nos da un aviso de negado y nos obliga a logear otra vez
const logout = (req, res) => {
	//borra el token
	res.cookie('token', '', {
		expires : new Date(0)
	})
	return res.sendStatus(200)
}

const profile = async(req, res) => {

	// console.log(req.user)
	//EN REQ.USER ESTA EL USUARIO DESCIFRADO POR LA FUNCION VALIDORA DEL TOKEN GUARDADO POR EL MIDDLEWARE ASI OBTENMOS EL ID CORRECTO EN LA BD 
	const userFound = await User.findById(req.user.id)

	//Si no se consigue el usuario mediante el id descifrado por el token se imprime not found
	if(!userFound) return res.status(400).json({message: 'usernot found'})

	//devolvemos no todo el usuario solo lo que necesitamos de el
	return res.json({
		id: userFound._id,
		username: userFound.username,
		email: userFound.email,
	})
}

const verifyToken = async (req, res) => {
	//verifica el token que llega por headers
  const { token } = req.cookies;
	// console.log(token)
	//si el token no existe responde con un error
  if (!token) return res.status(401).json({message: 'unauthorized'})
//jwt verifica el token  si hay un error responde 
  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);
//guardamos el usuario en una variable aquel que coincide con el id en la bd
const userFound = await User.findById(user.id);
	console.log(user)
		//Si no se consigue coincidencia en la bd retornamos un error
		//Esta es una buena oportunidad para crear una logica que si no lo encuentra en la bd lo crea
    if (!userFound) return res.sendStatus(401);

		//en caso contrario devuelve los datos del usuario encontrado, bueno al menos los datos que necesitamos
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};


module.exports = {
	register,
	login,
	logout,
	profile,
	verifyToken
}