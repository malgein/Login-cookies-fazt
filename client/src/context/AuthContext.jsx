import { createContext, useState, useContext, useEffect } from "react";
//Importamos la funcion que hace la llamada a la parte del backend que crea usuarios
import {registerRequest, loginRequest} from "../api/auth";
import Swal from 'sweetalert2'

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	//Creamos un estado de uso global que seria user
  const [user, setUser] = useState(null);
	//Estado que nos dice en la app si el usuario se logeo o no
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	//Estado que guardara los errores que devuelve el backend para ser mostrados correctamente en nuestro frontend
	const [errors, setErrors] = useState([])

	//Esto es para crear la funcio de registro de forma global y para pasarle a nuestro user goobal los datos del usuario que se esta registrando
  const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log(res.data);
			setUser(res.data)
			Swal.fire({
				icon: 'success',
				title: 'Usuario creado con exito'
			})
			setIsAuthenticated(true)
		} catch (error) {
			console.log(error.response)
			setErrors(error.response.data)
		}
  };

//Funcion que se dispara cuando el usuario hace login en la app se le pasa el valor del usuario que se logea y se establece el valor del context usuario global al usuario logeado si todo sale bien modificando isAuthenticated a true reedicrecciona a a profile dentro de la pagina
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
			console.log(res)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
			//Nos preguntamos si resppnse.data es un array, si lo es lo deveolvemos, si no lo es lo convertimos a arreglos y lo enviamos para mapearlo en el componente login
			if(Array.isArray(error.response.data)){
				return setErrors(error.response.data)
			}
      setErrors([error.response.data.message]);
    }
  };

	//Funciona como un cronometro limpiador de errorres despues de haber pasado un tiempo
	useEffect(() => {
		//Si al menos existe un error y si cambia lo que hay dentro de errors limpia el arrays de errors
		//Los timers en react son peligrosos porque si no usan bien consumen recursos, por ello se guarda en una variable y al final se destruye el timer
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

      
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
				signin,
				isAuthenticated,
				errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;