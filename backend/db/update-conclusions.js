const db = require('./index.js');

db.conn.sync().then(() => {
  db.models.Conclusions.update(
    {conclusion: "Je feuchter, desto fröhlicher: Du feierst Dich kompromisslos ins Delirium. Vorsätze sind um Mitternacht mit dem letzten Glockenschlag Geschichte, und der Kater am nächsten Morgen sagt laut und deutlich: Es kann nur noch besser werden. Hier kannst Du feiern: Barstreet Festival, Bern. Dancing Jäger, Innerdorf."},
    { where: { id: 37 } }
  ),
  db.models.Conclusions.update(
    {conclusion: "Du magst es gediegen und lässt Dir eine Feier unter Deinesgleichen nicht nehmen, schliesslich ist Silvester die letzte Gelegenheit, richtig viel Geld auszugeben. Aber bitte nicht zu stürmisch, denk an Dein Herz und Deinen Ruf. Hier kannst Du feiern: Casino Bern. GoGreen, Gstaad."},
    { where: { id: 38 } }
  ),
  db.models.Conclusions.update(
    {conclusion: "Silvester ist für Dich zwar der Wurmfortsatz der vom Konsum vereinnahmten Weihnachtszeit, andererseits gibt es überhaupt keinen Grund, eine gute Gelegenheit zum Feiern auszulassen. Denn jede Revolution beginnt mit einer guten Party. Hier wird man Dich antreffen: Reitschule, Bern. Chessu, Biel."},
    { where: { id: 39 } }
  ),
  db.models.Conclusions.update(
    {conclusion: "Letztlich mobilisierst Du wohl doch wieder die letzten Unentschiedenen und lädst sie zum Silvesterschmaus nach Hause ein. Tradition ist Tradition. Ein Last-Minute-Fondue-Chinoise lässt sich schliesslich immer irgendwo auftreiben. Hier feierst Du: In der guten Stube, und um Mitternacht gehts zum Cüpli auf den Balkon."},
    { where: { id: 40 } }
  ),
  db.models.Conclusions.update(
    {conclusion: "Du bist eher vom Typ Spassbremse und/oder Eltern von Spassbremsen. Über die Stränge schlagen? Sicher nicht! Morgen gehts früh aus den Federn. Falls nicht Deine Bälger Dich dazu nötigen, gibt es gute Gründe: Nie sind die Skipisten leerer als am Neujahrsmorgen. Hier kannst Du hin: Skipiste. Festival Touch the Mountains, Interlaken."},
    { where: { id: 41 } }
  )
});