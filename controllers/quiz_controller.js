
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
  var resultado = 'Roma';
  if (req.query.respuesta === resultado) {
    resultado = 'Correcto';
  }else{
	resultado = 'Incorrecto';
  }
  res.render('quizes/answer', {respuesta: resultado});
};

