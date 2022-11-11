import express, { application } from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { initializePassport } from './passport.config.js'
import passport from 'passport'

const app = express()
const server = app.listen(8080, () => console.log('Server Up'))

const connection = mongoose.connect("mongodb://localhost:27017/backend-25-users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let baseSession = session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/backend-25-sessions'}),
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false
})

app.use(express.json())
app.use(baseSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.post('/register', passport.authenticate('register', { failureRedirect: '/failureRegister'}), (req, res) => {
    res.send({message: 'Signed up'})
})

app.post('/failureRegister', (req, res) => {
    res.send({err: 'i cannot authenticate'})
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/failureLogin'}), (req, res) => {
    res.send({message: 'Logged in'})
})

app.post('/failureLogin', (req, res) => {
    res.send({err: 'i cannot login'})
})