import { useEffect } from "react"
import { useTasks } from "../context/TaskContext"
import TaskCard from "../components/TaskCard"

const TaskPage = () => {
//Trae la accion que traera todas las tareas y nos traemos las tareas en si
  const {getTasks, tasks} = useTasks()

  useEffect(() => {
    //Trae todas las tareas
    getTasks()
  }, [])
  
  //Si no hay tareas muestra que no hay tareas al inicio del componente
  if(tasks.length ===0) return <h1>No hay tareas</h1>

  return (
    <div className='grid grid-col-3 gap-2'>
      {/* {console.log(tasks)} */}
      {/* finalmente recoreemos todas las tareas para mostrarlas en el componente */}
      {tasks.map(task => (
        // <div key={task._id}>
        //   <h1>{task.title}</h1>
        //   <p className="text-gray">{task.description}</p>
        // </div>
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default TaskPage