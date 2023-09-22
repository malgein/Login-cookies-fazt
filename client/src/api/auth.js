//Se importa la configuracion que se tiene en axios.js de axios permitiendo asi que este tenga una url de base y que tenga la configuracion para tratar con cookies
import axios from "./axios";

//url base de nuestro backend
// const API = 'http://localhost:3000/api'

//funcion que hace el llamado al backend del post para crear un usuario, configurado y exportado para que se pueda llamar desde otras partes de nuestra aplicacion frontend
export const registerRequest = async (user) =>
  axios.post(`/register`, user);

//Funcion que hace un post a la ruta de logeo para autenticar el usuario que quoere ingresar a la app 
export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);
