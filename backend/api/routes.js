const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router.get('/', controllers.homeRoute);
router.get('/landingpage', controllers.landingpage);
router.get('/projects/firstquestion/:projectId', controllers.findFirstQuestion); //löschen
router.get('/firstquestion/:projectId', controllers.findFirstQuestion);
router.get('/questions/:questionId', controllers.findQuestionById); // löschen
router.get('/conclusions/:conclusionId', controllers.findConclusionById); // löschen
router.get('/question/:questionId', controllers.findQuestionById);
router.get('/conclusion/:conclusionId', controllers.findConclusionById);
router.get('/statistics/:projectId', controllers.countItems);
router.get('/customers/:projectId', controllers.customersById);
router.get('/customers', controllers.customers);
router.get('/helper/questions/:projectId', controllers.findQuestionsOfProject);
router.get('/helper/conclusions/:projectId', controllers.findConclusionsOfProject);
router.get('/helper/project/:projectId', controllers.findProjectById);
router.post('/statistics', controllers.saveStatistics);

module.exports = router;