const mongoose = require ("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    //ESTA PROPIEDAD HACE REFERENCIA A OTRO MODELO MEDIANTE EL ID AL MODELO USER , DE ALGUNA MANERA ESTABLECE UNA RELACION CON ESE MODELO
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task',taskSchema)