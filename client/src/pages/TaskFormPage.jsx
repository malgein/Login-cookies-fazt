//Componente que usamos para crear las tareas y tembien lo reutilizamos para editar las tareas
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
//importamos el contexto de las tareas
import { useTasks } from '../context/TaskContext'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


const TaskFormPage = () => {

  //Nos traemos el metodo register y de handlesubmit de esta libreria de formularios 
  const {register, handleSubmit, setValue} = useForm()

  const navigate = useNavigate()

  //recordar que params es un objeto en este caso con la clave id y cuyo valor el id correspondiente a la tarea
  const params = useParams()

  const {createTask, getTask, updateTask} = useTasks()
  // console.log(createTask)

  //funcion que dentro contiene el metodo handlesubmit de la libreria y que tiene como argumento el vaor de los inputs
  const onSubmit = handleSubmit ( async(data) => {

    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    // if(data.date) dataValid.date= dayjs.utc(data.date).format()
    //pregunta si existe un params con id 
    //!Si existe significa que estamos editando 
    //Llamando asi la funcion del context que llama la accion que hace el peiddo al backend para modificar tareas
    if(params.id){
      updateTask(params.id, dataValid)
      Swal.fire(
        'Tarea modificada con exito!',
        '',
        'success'
      )
      //!Si no existe params significa que estamos creando tareas
      //llamando a la accion de crear tareas del context que llama al endpoint del backend que crea las tareas
    } else{
      createTask(dataValid)
      Swal.fire(
        'Tarea creada con exito!',
        '',
        'success'
      )
    }
    // console.log(data)
    navigate('/tasks')
    
  })

  useEffect(() => {
    //Si 
    const loadTask =  async() => {
      //extrae el param de la tarea, osea el id si existe ejecuta lo siguiente
      if (params.id){
        // console.log(params.id)
        //Llamamaos a getTask que dentro llama al controlador delbackend para que me traiaga la tarea por id
        const task = await getTask(params.id)
        console.log(task)
        //setValue es un metodo de useForm que establece el valor de los inputs en las siguientes lienas establece el title y el description de los inputs al title y description de la tarea por id que estamos buscando para asi editarlo
        //tomamos el value de useForm y en el input con el nombre de title le pasamos el valor de la tearea por id pero solo su titulo
        setValue('title', task.title)
        //Aqui hacemos lo mismo que arriba pero establecemos el input con el nombre de descripcion y se los pasamos a la taera en su seccion de description
        setValue('description', task.description)
        //y finalmente hacemos lo mismo caue los dos anteriores pero con la fecha correspondiente
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    }
    loadTask();
    // console.log(params)
  }, [])
  

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
          <input type='text' placeholder='Title' {...register('title')} autoFocus className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
          <label htmlFor="description">Description</label>
          <textarea rows="3" placeholder='description' {...register('description')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'></textarea>
          <label htmlFor="date">Date</label>
          <input type="date" name="date" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' {...register("date")} />
          <button type='submit' className='bg-indigo-500 px-3 py-2 rounded-md'>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage