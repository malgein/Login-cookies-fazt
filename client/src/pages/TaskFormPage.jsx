import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
//importamos el contexto de las tareas
import { useTasks } from '../context/TaskContext'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'


const TaskFormPage = () => {

  //Nos traemos el metodo register y de handlesubmit de esta libreria de formularios 
  const {register, handleSubmit} = useForm()

  const navigate = useNavigate()

  //recordar que params es un objeto en este caso con la clave id y cuyo valor el id correspondiente a la tarea
  const params = useParams()

  const {createTask, getTask} = useTasks()
  // console.log(createTask)

  //funcion que dentro contiene el metodo handlesubmit de la libreria y que tiene como argumento el vaor de los inputs
  const onSubmit = handleSubmit((data) => {
    createTask(data)
    Swal.fire(
      'Tarea creada con exito!',
      '',
      'success'
    )
    // console.log(data)
    navigate('/tasks')
  })

  useEffect(() => {
    //Si 
    if (params.id){
      getTask(params.id)
    }
    // console.log(params)
  }, [])
  

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Title' {...register('title')} autoFocus className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
        <textarea rows="3" placeholder='description' {...register('description')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'></textarea>
        <button type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}

export default TaskFormPage