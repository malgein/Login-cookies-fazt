import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()

  const {signin, errors: singinErrors, isAuthenticated} = useAuth()

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    signin(data)
  })

  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])
  

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className=' bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
      {
        singinErrors.map((error, i) => {
          return(
          <div key={i} className='bg-red-500 p-2 text-white m-2'>
            {error}
          </div>
          )
        })
      }
        <h1 className='text-2xl font-bold'>Login</h1>
        <form onSubmit={onSubmit}
          //guardamos en una contante el valor de registrar un usuario en nuestro backend pasandole pasandole como datos para crearlo los valores de nuestro input
        >
          <input
            type="email"
            name="username"
            placeholder="Write your email"
            {...register("email", {required: true})}
            autoFocus
            className='w-full bg-zinc-700 text-white px-1 py-2 rounded-md my-2'
          />
            {errors.email && (
            <p className="text-red-500 ">Email is required</p>
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
          <button type='submit'>Login</button>
        </form>
        {/* No tienes ninguna cuenta registrate */}
        <p className="flex gap-x-2 justify-between">
          Don t have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage