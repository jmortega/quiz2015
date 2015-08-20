var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller')

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET autor page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Autor' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quiztematica',                quizController.quiztematica);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', 					sessionController.loginRequired, quizController.new);
router.post('/quizes/create', 				sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',		sessionController.loginRequired, quizController.destroy);

// Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// Definición de rutas de sesión
router.get('/login',  sessionController.new); 		// formulario login
router.post('/login', sessionController.create); 	// crear sesión
router.get('/logout', sessionController.destroy); 	// destruir sesión

/* GET statistics */
router.get('/statistics', 	statisticsController.numberQuestions,
							statisticsController.numberComments,
							statisticsController.avgCommentsPerQuestion,
							statisticsController.numberQuestionsWithComments,
							statisticsController.numberQuestionsWithOutComments,
							statisticsController.show);

module.exports = router;
