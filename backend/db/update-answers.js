const db = require('./index.js');

db.conn.sync().then(() => {
  db.models.Answers.update(
    { answer: 'Doch.'},
    { where: { id: 198 } }
  )
});