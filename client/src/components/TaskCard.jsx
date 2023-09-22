import { useTasks } from "../context/TaskContext"
import { Link } from "react-router-dom"
/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const TaskCard = ({task}) => {

	const {deleteTask} = useTasks()

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
			<header className='flex justify-between'>
				<h1 className='text-2xl font-bold'>{task.title}</h1>
				<div className='flex gap-x-2 items-center'>
					<button  onClick={() => deleteTask(task._id)}>Delete</button>
					<button>
						<Link to={`/tasks/${task._id}`}>Edit</Link></button>
				</div>
			</header>
			<p className='text-slate-300'>{task.description}</p>
			<p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard