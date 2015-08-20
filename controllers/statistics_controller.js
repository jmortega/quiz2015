var models = require('../models/models.js');


var numberQuestions = 0;
var numberComments = 0;
var avgCommentsPerQuestion = 0;
var numberQuestionsWithComments = 0;
var numberQuestionsWithOutComments = 0;

// 1 - Número total de preguntas
exports.numberQuestions = function(req,res,next)
{	
	models.Quiz.findAll()
	.then(function(numberQuestionsDB){
		numberQuestions = numberQuestionsDB.length;
	})
	.catch(function(error) { 
		next(error);
	})
	.finally(function () {
		next();
	});
}

// 2 - Número total de comentarios
exports.numberComments = function(req,res,next)
{
	models.Comment.findAll({where: ["publicado"]})
	.then(function(numberCommentsDB){
		numberComments = numberCommentsDB.length;
	})
	.catch(function(error) {
		next(error);
	})
	.finally(function () {
		next();
	});
}

// 3 - Número medio de comentarios por pregunta
exports.avgCommentsPerQuestion = function(req,res,next)
{
	avgCommentsPerQuestion = (numberComments/numberQuestions).toFixed(0);
	next();
}

// 5 - Número de preguntas con comentarios
exports.numberQuestionsWithComments = function(req,res,next)
{
	numberQuestionsWithComments=0;
	models.Comment.findAll({where: ["publicado"]})
	.then(function(numberQuestionsWithCommentsDB) {
		for(i = 0; i < numberQuestionsWithCommentsDB.length; i++){
			for(j = i; j < numberQuestionsWithCommentsDB.length; j++){
				if(numberQuestionsWithCommentsDB[j].QuizId === numberQuestionsWithCommentsDB[i].QuizId){
					if(j === i && numberQuestionsWithCommentsDB[i].QuizId !== "-1"){
						numberQuestionsWithComments++;
					}else{
						numberQuestionsWithCommentsDB[j].QuizId = "-1";
					}
				}
			}
		}

	})
	.catch(function(error) { 
		next(error);
	})
	.finally(function () {
		next();
	});

}

// 4 - Número de preguntas sin comentarios
exports.numberQuestionsWithOutComments = function(req,res,next)
{
	numberQuestionsWithOutComments = numberQuestions - numberQuestionsWithComments;
	next();
}

// GET /statistics/
exports.show = function(req,res){
	res.render('statistics', { 	numberQuestions: numberQuestions,
								numberComments: numberComments,
								avgCommentsPerQuestion: avgCommentsPerQuestion,
								numberQuestionsWithComments: numberQuestionsWithComments,
								numberQuestionsWithOutComments: numberQuestionsWithOutComments,
								errors: []});
}