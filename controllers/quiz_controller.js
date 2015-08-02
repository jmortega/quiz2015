
var models = require('../models/models.js');

// Lista de temáticas
var tematicas = ["Otro", "Humanidades", "Ocio", "Ciencia", "Tecnología"];

exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};

// GET /quizes/new
exports.new = function(req, res) {
   console.log('new');
   var quiz = models.Quiz.build(
	{pregunta:"Pregunta",respuesta:"Respuesta"}
   );
   res.render('quizes/new',{quiz:quiz,tematicas:tematicas});

};


// GET /quizes/:id/edit
exports.edit = function(req, res) {
   console.log('edit');
   var quiz = req.quiz;
   
   res.render('quizes/edit',{quiz:quiz,tematicas:tematicas});

};

// PUT /quizes/:id
exports.update = function(req, res) {
  console.log('update');
	req.quiz.pregunta=req.body.quiz.pregunta
	req.quiz.respuesta=req.body.quiz.respuesta
	req.quiz.tematica=req.body.quiz.tematica
	
        req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tematica"]})
        .then( function(){ res.redirect('/quizes');})
            // res.redirect: Redirección HTTP a lista de preguntas
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  console.log('destroy');
  
        req.quiz
        .destroy()
        .then( function(){ res.redirect('/quizes'); // res.redirect: Redirección HTTP a lista de preguntas
		}).catch(function(error){next(error)});
           
};

// POST /quizes/create
exports.create = function(req, res) {
  console.log('create');
  var quiz = models.Quiz.build( req.body.quiz );


        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tematica"]})
        .then( function(){ res.redirect('/quizes');})
            // res.redirect: Redirección HTTP a lista de preguntas
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

// GET /quizesTematica
exports.quizesTematica = function(req, res) {

  //Obtener parámetro de busqueda tematica
  var searchTematica = req.query.searchTematica || "";

  var _paramSearchTematica = {
    where: ["tematica like ?", searchTematica]
  };
  
  models.Quiz.findAll(_paramSearchTematica).then(function(quizes) {
    res.render('quizes/index', { quizes: quizes});
   }).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {

    res.render('quizes/show', { quiz: req.quiz});
  
};