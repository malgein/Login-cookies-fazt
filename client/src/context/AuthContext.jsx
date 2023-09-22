import { createContext, useState, useContext, useEffect } from "react";
//Importamos la funcion que hace la llamada a la parte del backend que crea usuarios
import {registerRequest, loginRequest, verifyTokenRequest} from "../api/auth";
import Swal from 'sweetalert2'
import Cookies from "js-cookie";

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
//Estado que simulara un ambiente de carga mientras  se muestran cierto datosy se monta el componente
  const [loading, setLoading] = useState(true)

	//Esto es para crear la funcio de registro de forma global y para pasarle a nuestro user goobal los datos del usuario que se esta registrando
  const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			// console.log(res.data);
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
			// console.log(res)
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

  //Funcion que se llama para deslogear a; usuario funciona simplemente destruyendo el token de acceso
  const logout = () =>{
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

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

  //useEffect encargdo de permitir el paso a las rutas protegidas de acuerdo si el usuario esta autenticado o no
  useEffect(() => {
    //Verifica si al montar el componente hay una cookie, cuando recargamos la pagina o pasamos a otra parte de la app se borran los estados, esto es para determinar que hay una cookie con un token y por tanto dejarme pasar a las rutas que necesitan autenticacion
   async function checkLogin(){
     const cookies = Cookies.get()
    //  console.log(cookies)
  
    //verificca si el token lo tiene el navegador si ya se encuantra autenticado, si no es asi torna el usuario en nulo y el isAuthenticated en false y el loading el false lo que deberia de reedicreccionar al login 
     if(!cookies.token){
      setIsAuthenticated(false)
      setLoading(false)
      return setUser(null)
     }
      // console.log(cookies.token)
      try {
        //aplica la funcion de verificar el token que nos traemos de la carpeta api que al mismo tiempo se trae del backend verifica el cookies.token a ver si es valido
        const res = await verifyTokenRequest(cookies.token);
        // console.log(res);
        //si no es valido torna el isauthenticated en false y el estado de carga en false tambien para que se detenga el spiner
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false)
          return
        }
        //si es valido  torna el isauthenticated en true le pasa al estador user global el los datos que necesitamos del usuario guardado 
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
        setUser(null)
        setLoading(false)
      }
     
   }
   checkLogin();
  }, [])
  
      //exportamos para uso global, el user que representa el usuario que se esta logeando y todos sus datos, la funcion de registro, la funcion de logeo, el estado de carga loading, el estado que indica que esta autenticado o no (isAuthenticated) y los errores
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
				signin,
        loading,
				isAuthenticated,
        logout,
				errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;