import { useTasks } from "../context/TaskContext"
import { Link } from "react-router-dom"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);


/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const TaskCard = ({task}) => {

	const {deleteTask} = useTasks()

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
			<header className='flex justify-between'>
				<h1 className='text-2xl font-bold'>{task.title}</h1>
				<div className='flex gap-x-2 items-center'>
					<button  onClick={() => deleteTask(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2">Delete</button>
					<button>
						{/* Aqui envia al formulario de la creacion de tareasel cual tiene un id y que esta establecido en el sistema de rutas en app.jsx */}
						<Link to={`/tasks/${task._id}`} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Edit</Link></button>
				</div>
			</header>
			<p className='text-slate-300'>{task.description}</p>
			{/* <p>{new Date(task.date).toLocaleDateString()}</p> */}
			<p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
    </div>
  )
}

export default TaskCard