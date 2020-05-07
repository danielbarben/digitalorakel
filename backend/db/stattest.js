const body = JSON.stringify({conclusion: "Die Alternativen"})
const headers = new Headers({
  'Content-Type': 'application/json'
})
const config = {
  headers: headers,
  method: 'POST',
  body: body
}
fetch(`https://api.digitalorakel.ch/statistics`, config)
