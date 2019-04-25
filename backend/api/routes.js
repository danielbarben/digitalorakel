const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router.get('/', controllers.homeRoute);
router.get('/projects', controllers.findAllProjects); //Unnötig
router.get('/landingpage', controllers.landingpage);
router.get('/projects/firstquestion/:projectId', controllers.findFirstQuestion);
router.get('/projects/:projectId', controllers.findProjectsById); //Unnötig
router.get('/questions/:questionId', controllers.findQuestionById);
router.get('/conclusions/:conclusionId', controllers.findConclusionById);
router.get('/conclusions/projects/:projectId', controllers.findConclusionByProject); //Unnötig
router.post('/statistics', controllers.saveStatistics);
router.get('/statistics/:projectId', controllers.countItems);
router.get('/customers/:projectId', controllers.customersById)
module.exports = router;