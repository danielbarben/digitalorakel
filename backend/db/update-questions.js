const db = require('./index.js');

db.conn.sync().then(() => {
  db.models.Questions.update(
    { question: 'Hallo, ich bin Sanja. Ich finde für Dich den perfekten Ort zu Deinem Knalltütenpotenzial. Wie steht es um Deine Feierlaune?'},
    { where: { id: 75 } }
  )
});