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
    }).then(projects =>  {
        res.status(200).send(projects)
    })
};
const findFirstQuestion = (req, res) => {
    const projectId = req.params.projectId
    db.models.Projects
    .findByPk(projectId, {
        include: [{
            model: db.models.Questions
        }], order: [
            [db.models.Questions, 'id', 'asc']]         
    })
    .then(projects => {
        projects === null ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : res.status(200).send(projects.questions[0])
    })
};
const findQuestionById = (req, res) => {
    const questionId = req.params.questionId
    db.models.Questions
    .findByPk(questionId, {
        include: [db.models.Answers]
    })
    .then(question  => {
        question === null ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : res.status(200).send(question)
    })
};
const findConclusionById = (req, res) => {
    const conclusionId = req.params.conclusionId;
    db.models.Conclusions.findByPk(conclusionId)
    .then(conclusion => {
        conclusion === null ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : res.status(200).send(conclusion)
    })
};
const countItems = (req, res) => {
    const projectId = req.params.projectId;
    let total = 0;
    let countresult = [];
    db.models.Conclusions
    .findAll({
        where: {
            projectId : projectId
        }   
    })
    .then(conclusions => {
        const itemlist = conclusions.map((item, index) => {
            return item.title
        })
        itemlist.length === 0 ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : ''
        for (el of itemlist) {
            db.models.Statistics.findAndCountAll({
                where: {
                    item: el
                }
            })
            .then(cn => {
                countresult.push(cn)
                total = total + cn.count;
                if (countresult.length === itemlist.length) {
                    let resultToSend = [];
                    for (index in itemlist) {
                        if (countresult[index].count > 0) {
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
    let result = [];
    db.models.Conclusions
    .findAll({
        where: {
            projectId : projectId
        }
    })
    .then(projects => {
        const itemlist = projects.map((item, index) => {
            return {'projectId': item.projectId, 'title': item.title}
        })
        itemlist.length === 0 ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : ''
        for (el of itemlist) {
            db.models.Statistics.findAndCountAll({
                where: {
                    item: el.title
                }
            })
            .then(cn => {
                result.push(cn.count)
                if (result.length === itemlist.length) {
                    let sum = result.reduce((partial_sum, a) => partial_sum + a); 
                    res.status(200).send({'projectId': itemlist[0].projectId, 'total':sum})
                }
            })
        }
    })
};
const customers = (req, res) => {
    let result = [];
    db.models.Projects
    .findAll({
        where: {
            status : 'online'
        },
        order: [['id', 'ASC']]
    })
    .then(projects => {
        const projectlist = projects.map((item,index) => {
            return item.id
        })
        for (project of projectlist) {
            let perproject = [];
            db.models.Conclusions
            .findAll({
                where: {
                    projectId : project
                }
            })
            .then(projects => {
                const itemlist = projects.map((item, index) => {
                    return {'projectId': item.projectId, 'title': item.title} 
                })
                for (el of itemlist) {
                    console.log(el.projectId)
                    db.models.Statistics.findAndCountAll({
                        where: {
                            item: el.title
                        }
                    })
                    .then(cn => {
                        perproject.push(cn.count)
                        if (perproject.length === itemlist.length) {
                            console.log(itemlist)
                            let sum = perproject.reduce((partial_sum, a) => partial_sum + a); 
                            result.push({'projectId': itemlist[0].projectId, 'total': sum})
                            if (result.length === projectlist.length) {
                                res.status(200).send({result})
                            }
                        }
                    })
                }
            })
        }  
    })
};
//helper
const findQuestionsOfProject = (req, res) => {
    const projectId = req.params.projectId
    db.models.Questions
    .findAll({
        where: {
            projectId : projectId
        }
    })
    .then(questions  => {
        const result = questions.map((item, index) => {
            return {'id' : item.id, 'question' : item.question}
        })
        result.length === 0 ? res.status(404).send(["Jetzt bin ich überfragt!"]) : res.send(result)
    })
};
const findConclusionsOfProject = (req, res) => {
    const projectId = req.params.projectId
    db.models.Conclusions
    .findAll({
        where: {
            projectId : projectId
        }
    })
    .then(conclusions  => {
        const result = conclusions.map((item, index) => {
            return {'id' : item.id, 'conclusion' : item.conclusion}
        })
        result.length === 0 ? res.status(404).send(["Jetzt bin ich überfragt!"]) : res.send(result)
    })
};
const findProjectById = (req, res) => {
    const projectId = req.params.projectId
    db.models.Projects
    .findByPk(projectId, {
        include: [{
            model: db.models.Questions, include: [db.models.Answers]
        }]
    })
    .then(projects => {
        projects === null ? res.status(404).send(["Entschuldigung, das Orakel ist überfragt"]) : res.status(200).send(projects);
    })
};
//post
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

module.exports = {
    homeRoute,
    //findAllProjects,
    findProjectById,
    findQuestionById,
    findConclusionById,
    saveStatistics,
    countItems,
    customers,
    //findConclusionByProject,
    findFirstQuestion,
    landingpage,
    customersById,
    findQuestionsOfProject,
    findConclusionsOfProject
}