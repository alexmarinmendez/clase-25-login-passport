import express from 'express'
import session from 'express-session'

const app = express()
const server = app.listen(8080, () => console.log('Server Up'))

let baseSession = session({
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false
})

app.use(express.json())
app.use(baseSession)