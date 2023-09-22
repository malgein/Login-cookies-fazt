const {Router} = require('express')
const {login, register, logout, profile} = require('../controllers/auth.controllers.js')
const authRequired = require('../middlewares/validateToken.js')
//Se usara para validar datos del login y del register
const validationSchema = require('../middlewares/validator.middleware.js')
//Se usara para validar datos del login y del register
const {registerSchema, loginSchema} = require('../schemas/auth.schema.js')
const validateSchema = require('../middlewares/validator.middleware.js')
//Para verificar los tokens
const {verifyToken} = require('../controllers/auth.controllers')

const router = Router()

router.post('/register', validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)
//ruta protegida por autenticacion a traves de un midlewarw
router.get('/profile',authRequired, profile)

//Verifica si el usuario esta logeado si tiene un token valido
router.get("/verify", verifyToken);


module.exports = router