const db = require('./index.js');

db.conn.sync().then(() => {
  db.models.Answers.update(
    { answer: 'Fondue Chinoise.'},
    { where: { id: 214 } }
  ),
  db.models.Answers.update(
    { answer: 'Ein Schluck Rimuss im Schoppen muss sein.'},
    { where: { id: 216 } }
  ),
  db.models.Answers.update(
    { answer: 'Hauptsache, knusprig.'},
    { where: { id: 222 } }
  ),
  db.models.Answers.update(
    { answer: 'Secondhand-Kleider.'},
    { where: { id: 224 } }
  ),
  db.models.Answers.update(
    { answer: 'Yatzy.'},
    { where: { id: 228 } }
  ),
  db.models.Answers.update(
    { answer: '«Dinner for one».'},
    { where: { id: 231 } }
  ),
  db.models.Answers.update(
    { answer: '«The Final Countdown».'},
    { where: { id: 232 } }
  ),
  db.models.Answers.update(
    { answer: 'So heisst doch ein Bär im Bärenpark.'},
    { where: { id: 236 } }
  ),
  db.models.Answers.update(
    { answer: 'Du meinst Sylvester Stallone?'},
    { where: { id: 237 } }
  )
});
