import {useForm} from 'react-hook-form'
//importamos el contexto de las tareas
import { useTasks } from '../context/TaskContext'
import Swal from 'sweetalert2'


const TaskFormPage = () => {

  //Nos traemos el metodo register y de handlesubmit de esta libreria de formularios 
  const {register, handleSubmit} = useForm()

  const {createTask} = useTasks()
  console.log(createTask)

  //funcion que dentro contiene el metodo handlesubmit de la libreria y que tiene como argumento el vaor de los inputs
  const onSubmit = handleSubmit((data) => {
    createTask(data)
    Swal.fire(
      'Tarea creada con exito!',
      '',
      'success'
    )
    console.log(data)
  })

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