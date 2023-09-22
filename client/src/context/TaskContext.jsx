//Creamos otro contexto para las tareas igual que como hicimos con los usuarios
import { createContext, useContext, useState } from "react";
//Trae las acciones que del CRUD de tareas
import { createTaskRequest, getTasksRequest } from "../api/tasks";

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

	return(
		<TaskContext.Provider 
		value={{
			tasks,
			getTasks,
			createTask
		}}>
			{children}
		</TaskContext.Provider>
	)
}