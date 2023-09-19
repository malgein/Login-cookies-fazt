import axios from "axios";

//url base de nuestro backend
const API = 'http://localhost:3000/api'

//funcion que hace el llamado al backend del post para crear un usuario, configurado y exportado para que se pueda llamar desde otras partes de nuestra aplicacion frontend
export const registerRequest = async (user) =>
  axios.post(`${API}/register`, user);

//Funcion que hace un post a la ruta de logeo para autenticar el usuario que quoere ingresar a la app 
export const loginRequest = async (user) => axios.post(`${API}/login`, user);
