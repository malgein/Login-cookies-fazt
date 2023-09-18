const {Router} = require('express')
//middleware que validara el token
const authRequired = require('../middlewares/validateToken')
//controladores de CRUD de tareas
const {createTasks, getTasks, deleteTask, updateTask, getTask}  = require('../controllers/tasks.controller')
//plantilla validadora que reciba un xhema y validar algo que quiero recibir del frontend
const validateSchema = require('../middlewares/validator.middleware')
//recibe lo que validara del fontend y se lo pasa a validate schema
const createTaskSchema = require('../schemas/task.schema')

const router = Router()

//protegido por el midleware de los tokens y cookies
router.get('/tasks', authRequired, getTasks)

router.post("/tasks", authRequired ,validateSchema(createTaskSchema), createTasks);

router.get("/tasks/:id", authRequired, getTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);


module.exports=router