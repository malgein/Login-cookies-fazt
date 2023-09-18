const { z } = require("zod");
//Archivo que sirve para validar datos de tareas
const createTaskSchema = z.object({
    //validando que el titulo de la tarea sea requirerido
  title: z.string({
    required_error: "Title is required",
  }),
  //la descripcion y la fecha son opcionales
  description: z.string({
    required_error: "Description is required",
  }),
  date: z.string().datetime().optional(),
});

module.exports = createTaskSchema;