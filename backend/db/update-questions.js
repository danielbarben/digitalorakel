const db = require('./index.js');

db.conn.sync().then(() => {
  db.models.Questions.update(
    { question: 'Hallo, ich bin Georg. Ich helfe Dir bei der Wahl Deines nächsten Urlaubsziels. Fährst Du lieber in die Berge oder ans Meer?'},
    { where: { id: 58 } }
  )
});