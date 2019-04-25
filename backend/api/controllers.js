const db = require('../db/index.js');

const homeRoute = (req, res) => {
    res.status(200).send("Das Orakel denkt nach!")
}
const landingpage = (req, res) => {
    db.models.Projects
    .findAll({
        where: {
            status : 'online'
        },
        order: [['order', 'ASC']]
    })
    .then(projects => {
        res.status(200).send(projects);
    })
};

const findAllProjects = (req, res) => {
    db.models.Projects
    .findAll({
        include: [{
            model: db.models.Questions, include: [db.models.Answers]
        }]
    })
    .then(projects => {
        res.status(200).send(projects);
    })
};

const findProjectsById = (req, res) => {
    const projectId = req.params.projectId
    db.models.Projects
    .findByPk(projectId, {
        include: [{
            model: db.models.Questions, include: [db.models.Answers]
        }]
    })
    .then(projects => {
        res.status(200).send(projects);
    })
};

const findFirstQuestion = (req, res) => {
    const projectId = req.params.projectId
    db.models.Projects
    .findByPk(projectId, {include: [{
        model: db.models.Questions}], order: [
            [db.models.Questions, 'id', 'asc']]         
    })
    .then(projects => {
        res.status(200).send(projects.questions[0]);
    })
};

const findQuestionById = (req, res) => {
    const questionId = req.params.questionId
    db.models.Questions
    .findByPk(questionId, {
        include: [db.models.Answers]
    })
    .then(question  => {
        question === null ? res.status(404).send(["Jetzt bin ich überfragt!"]) : res.send(question)
    })
};

const findConclusionById = (req, res) => {
    const conclusionId = req.params.conclusionId;
    db.models.Conclusions.findByPk(conclusionId)
    .then(conclusion => {
        conclusion === null ? res.status(404).send(["Jetzt bin ich überfragt!"]) : res.send(conclusion)
    })
};

const saveStatistics = (req,res) => {
    const {conclusion} = req.body;
    if (conclusion) {
        db.models.Statistics.create({
            item:conclusion
        })
        .then(conclusion => res.send(conclusion))
    }
    else {
        res.send({
            RequiredData: ["conclusion"]
        })
    }
};

const findConclusionByProject = (req, res) => {
    const projectId = req.params.projectId
    db.models.Conclusions
    .findAll({where: {
        projectId : projectId
    }
})
    .then(projects => {
        const tmp = projects.map((item, index) => {
            return item.title
        })
        res.status(200).send(tmp);
    })
};

const countItems = (req, res) => {
    const projectId = req.params.projectId;
    let total = 0;
    let countresult = [];
    let counter = 0;
    db.models.Conclusions
    .findAll({
        where: {
            projectId : projectId
        }   
    })
    .then(projects => {
        const itemlist = projects.map((item, index) => {
            return item.title
        })
        for (el of itemlist) {
            db.models.Statistics.findAndCountAll({
                where: {
                    item: el
                }
            })
            .then(cn => {
                countresult.push(cn)
                counter ++
                total = total + cn.count;
                if (counter === itemlist.length) {
                    let resultToSend = [];
                    for (index in itemlist) {
                        if (countresult[index].count>0) {
                            resultToSend.push({'count':Math.round(100/total*countresult[index].count), 'item':countresult[index].rows[0].item})
                        }
                    }
                    function compare(a,b) {
                        if (a.count > b.count) {
                            return -1;
                        }
                        if (a.count < b.count) {
                            return 1;
                        }
                    }
                    resultToSend.sort(compare);
                    res.status(200).send(resultToSend)
                }
            })
        }
    })
};

const customersById = (req, res) => {
    const projectId = req.params.projectId;
    let total = 0;
    let counter = 0;
    db.models.Conclusions
    .findAll({
        where: {
            projectId : projectId
        }
    })
    .then(projects => {
        const itemlist = projects.map((item, index) => {
            return item.title
        })
        for (el of itemlist) {
            db.models.Statistics.findAndCountAll({
                where: {
                    item: el
                }
            })
            .then(cn => {
                counter ++
                total = total + cn.count;
                if (counter === itemlist.length) {
                    res.status(200).send({'total':total})
                }
            })
        }
    })
};



module.exports = {
    homeRoute,
    findAllProjects,
    findProjectsById,
    findQuestionById,
    findConclusionById,
    saveStatistics,
    countItems,
    findConclusionByProject,
    findFirstQuestion,
    landingpage,
    customersById
}