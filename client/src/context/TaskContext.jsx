//Creamos otro contexto para las tareas igual que como hicimos con los usuarios
import { createContext, useContext, useState } from "react";
//Trae las acciones que del CRUD de tareas
import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest, getTaskRequest } from "../api/tasks";

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)

	if(!context){
		throw new Error('useTasks must be used within a TasksProvider')
	}
	return context
}

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children}) {
	//El estado de tareas las hacemos global
	const [tasks, setTasks] =useState([])

	//funcion para crear tareas en el backend
	const createTask = async(task) =>{
		const res = await createTaskRequest(task)
		// console.log(res)
	}
	//Funcion que dentro ejecutaria el traer tdas las tareas y que es exportada en en un context para todo su uso en toda la aplicacion
	const getTasks = async() => {
		try {
			const res = await getTasksRequest()
			//en el estado global tareas colocamos el resultado de traer todas las tareas del endpoint
			setTasks(res.data)
			// console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	//Borra la tarea seleccionada mediante un id llamando a deleteTaskRequest el cual llama al endpoint que borrara la tarea en cuestion
	const deleteTask = async(id) => {
		try {
			//Hacemos un filter de las tareas y le pasamos el resultado a setTaasks para que pueda actualizarse la interfaz ya que si borramos la tarea sim hacer filter la tarea que borramos no se borra de la interfaz a menos que refresquemos la app 
			const res = await deleteTaskRequest(id)
			if(res.status === 204) setTasks(tasks.filter(task => task._id !== id))
		} catch (error) {
			console.log(error)
		}
	}

	//Funcion que me va a traer a traves de un pedido a las acciones otra funcion que hace un llamadado a la bd y me trae una tarea en especifico a traves del id.
	//!Esto no es para mostrar una tarea en especifico es mas bien parea editar una tarea en espefico
	const getTask = async(id) => {
		const res = await getTaskRequest(id)
		console.log(res)
	}



	return(
		<TaskContext.Provider 
		value={{
			tasks,
			getTasks, 
			createTask,
			deleteTask,
			getTask
		}}>
			{children}
		</TaskContext.Provider>
	)
}