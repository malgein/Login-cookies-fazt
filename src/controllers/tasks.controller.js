const Task = require('../models/tasks.model')


//controlador que obtiene todas las tareas
const getTasks = async(req, res) => {
	try {
		//metodo de moongose para traer todas las taeras de la db
		//configurado hora para traer solo las tareas del usuarios con req.user
		const tasks = await Task.find(
			{ user: req.user.id }
		).populate('user')// me trae todo el usuario relacionado no solo su id
		res.json(tasks)
	} catch (error) {
		res.status(500).json({message: 'error el servidor'})
	}

}


//controlador que crea las tareas
const createTasks = async(req, res) => {

	//sacamos los elementos title, description y date que se envian desde el frontend
	const {title, description} =req.body
	try {
		//metodo de moongose para crear un nuevo elemento en el modelo al cual se le aplica
		const newTask = new Task({
			title,
			description,  
			//recordar que el midleware le pasa el id descifrado a traves del token a este controlador y lo usamos para relacionarlo coon el id del usuario del modelo User al final crea la tarea y la relaciona con user que esta autenticado
			user: req.user.id
		})
	
		//metodo de moongose para guardar el elemento al modelo asociado
		const savedTasks = await newTask.save()
	
		res.json(savedTasks)
	} catch (error) {
		res.status(500).json({message: 'error del servidor'})
	}
}

const getTask = async(req, res) => {
	const {id} = req.params

	try {
		//Trae todas las tareas mas los datos completo del usaurio al agregarle populate
		const task = await Task.findById(id).populate('user')
 
		if(!task) return res.status(404).json({message: 'task not found'})

		res.json(task)
	} catch (error) {
		res.status(500).json({error: 'error del servidor'})
	}
}

const updateTask =async(req, res) => {

	const {id} = req.params

	try {

		//AQUI ME EDITA Y ME DEVUELVE LA TAREA ACTUALIZADA, ESTA CONFIGURADA PARA QUE ME DEVUELVA LA NUEVA TAREA  CON LA PARTE DE new: true
		const task = await Task.findByIdAndUpdate(id, req.body, {
			new: true
		})

		if(!task) return res.status(404).json({message: 'task not found'})
		res.json(task)
	} catch (error) {
		
	}
}

const deleteTask = async(req, res) => {
	const {id} = req.params

	try {
		const taskDeleted = await Task.findByIdAndDelete(id)

		if(!taskDeleted) return res.status(404).json({message: 'task not found'})

		return res.sendStatus(204)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}


module.exports={
	getTasks,
	createTasks,
	updateTask,
	deleteTask,
	getTask
}