//Midleware para validar informacion en el backend
//en el argumento schema reciba una as validaciones que pueden ser para usuarios, tareas, lo que quieras validar del frontend hacia el backend
const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json(error.errors.map((error)  => error.message) );
    }
  };

module.exports= validateSchema