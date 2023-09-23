//Nos traemos es la instancia de axios no la libreria como tal cuyo endpoint base es localhost 3000
import axios from './axios'
//Este archivo funcionaria como un actions de redux contiene todas las funciones ya establecias para su posterior uso y llamdo a las rutas del servidor

//Me trae todas las tareas
export const getTasksRequest = async () => axios.get("/tasks");

//Crea las tareas
export const createTaskRequest = async (task) => axios.post("/tasks", task);

//Actualiza las tareas
export const updateTaskRequest = async (id, task) =>
  axios.put(`/tasks/${id}`, task);

//Borra las tareas
export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

//obtiene una tarea por id
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);