import express from 'express'
import HTTP from 'http'

let app = express()
let server = new HTTP.Server(app)

app.use(express.static('template_design'))
app.use(express.static('public'))


app.use((req, res) => {
	res.redirect('404.html')
})

server.listen(8888, () => {
	console.log(` server listening on http://localhost:8888`)
})
