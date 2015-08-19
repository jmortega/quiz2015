// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(	
  	'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
	  tematica: {
        type: DataTypes.ENUM,
		values: ['Otro', 'Humanidades', 'Ocio', 'Ciencia', 'Tecnología'],
        validate: { notEmpty: {msg: "-> Falta Tematica"}}
      }
    }
  )	;
}

