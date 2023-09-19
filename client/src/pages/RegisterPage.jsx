/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
//funcion que creamos  y exportamos para registrar un nuevo usuario
import { useAuth } from "../context/AuthContext";
import {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";


const RegisterPage = () => {
//funcionalidades de registro y manejador de eventos submit desde un manejador de formularios para react
//Nos traemos los errores tambien para poder mostrarlos en caso de existir
  const {register, handleSubmit,  formState: { errors }} = useForm()
  //funcion de resgistro traida de nuestro context recibe unos valores que al final seran extraidos de nuestro input con la libreria de forularios y asi crear nuestro usuario
  //Nos traeremos nuestro usuario para verlo de momento en la consola
  //importamos desde el contex el estado isAuthenticated para determinar si el usuario esta logeado
  const {signup, isAuthenticated, errors: registerErrors} = useAuth()
  //Me muestra el usuario que se acaba de registrar

  const navigate = useNavigate()

  const onSubmit= handleSubmit(async (values) => {
    signup(values)
  })

  //Si el usuario esta registrado correctamente se setea el isAuthenticated a true y se reedirecciona a tasks 
  useEffect(() => {
    if(isAuthenticated){
      navigate('/tasks')
    }
  }, [isAuthenticated])
  

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
      {/* El siguiente mapeo envia una notificacion de los errores mapeados y renderizados al principio de los inputs si  existen estos errores como el de el usuario ya existe  los muestra*/}
      {
        registerErrors.map((error, i) => {
          return(
          <div key={i} className='bg-red-500 p-2 text-white'>
            {error}
          </div>
          )
        })
      }
      {/* Metodo handleSubmit de useForm() recibe un callback cuyo parametro son los valores que ingresamos en los inputs dentro imprimos value en la consola lo que nos dara el valor de los inputs */}
			<form onSubmit={onSubmit}
        //guardamos en una contante el valor de registrar un usuario en nuestro backend pasandole pasandole como datos para crearlo los valores de nuestro input
       >
				<input
          type="text"
          name="username"
          placeholder="Write your username "
          {...register("username", {required: true})}
          autoFocus
					className='w-full bg-zinc-700 text-white px-1 py-2 my-2 rounded-md'
        />
          {errors.username && (
          <p className="text-red-500">Username is required</p>
          )}
				<input
          type="email"
          name="username"
          placeholder="Write your email"
          {...register("email", {required: true})}
          autoFocus
					className='w-full bg-zinc-700 text-white px-1 py-2 rounded-md my-2'
        />
          {errors.email && (
          <p className="text-red-500">Email is required</p>
          )}
				<input
          type="password"
          name="password"
          placeholder="Write your password"
          {...register("password", {required: true})}
          autoFocus
					className='w-full bg-zinc-700 text-white px-1 py-2 rounded-md my-2'
        />
          {errors.password && (
          <p className="text-red-500">password is required</p>
          )}
				<button type='submit'>Register</button>
			</form>
      <p>
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
    </div>
  )
}

export default RegisterPage