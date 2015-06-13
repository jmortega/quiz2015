
var models = require('../models/models.js');

exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};

// GET /quizes/answer
exports.answer = function(req, res) {
   var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {

  //Obtener parámetro de busqueda
  var search = req.query.search || "";

  //filtro para búsqueda mediante expresion regular
  search = "%" + search.replace(/\s/gi, "%") + "%";

  var _paramSearch = {
    where: ["pregunta like ?", search]
  };
  
  models.Quiz.findAll(_paramSearch).then(function(quizes) {
    res.render('quizes/index', { quizes: quizes});
   }).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {

    res.render('quizes/show', { quiz: req.quiz});
  
};