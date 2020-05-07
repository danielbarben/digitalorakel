const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router.get('/', controllers.homeRoute);
router.get('/landingpage', controllers.landingpage);
router.get('/firstquestion/:projectId', controllers.findFirstQuestion);
router.get('/question/:questionId', controllers.findQuestionById);
router.get('/conclusion/:conclusionId', controllers.findConclusionById);
router.get('/statistics/:projectId', controllers.countItems);
router.get('/customers/:projectId', controllers.customersById);
router.get('/customers', controllers.customers);
router.get('/helper/questions/:projectId', controllers.findQuestionsOfProject);
router.get('/helper/conclusions/:projectId', controllers.findConclusionsOfProject);
router.get('/helper/project/:projectId', controllers.findProjectById);
router.get('/helper/projects', controllers.findAllProjects);
router.post('/statistics', controllers.saveStatistics);

module.exports = router;