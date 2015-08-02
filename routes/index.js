var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

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
router.get('/quizesTematica',              quizController.quizesTematica);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',   	   quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

module.exports = router;
