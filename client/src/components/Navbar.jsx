import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {
//Lamamos a isAuthenticated para ssaber si esta autenticado depndiendo a aeso mostrara unas cosas y evitara mostrar otras
	const {isAuthenticated, user, logout} = useAuth()

	return (
		<nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
			<Link to='/'>
				<h1 className='text-2xl font-bold' >
					Task Manager
				</h1>
			</Link>
			<ul className='flex gap-x-2'>
				{isAuthenticated ? (
					<>
						<li>
							Welcome {user.username}
						</li>
						<Link to='/tasks' className='bg-indigo-500 px-4 py-1'>
							<li>
								Tasks
							</li>
						</Link>
						<Link to='/add-task' className='bg-indigo-500 px-4 py-1'>
							<li>
								Add task
							</li>
						</Link>
						<li>
							<Link to='/' onClick={() => logout()}>Logout</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/login' className='bg-indigo-500 px-4 py-1'>Login</Link>
						</li>
						<li>
							<Link to='/register' className='bg-indigo-500 px-4 py-1'>Register</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar