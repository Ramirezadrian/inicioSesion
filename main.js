const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

mongoose.connect('mongoodb://localhost:27017/sesion')
const User = require('./models/user')

const app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

passport.use('login', new LocalStrategy((username, password, done) => {

}))



const PORT = 8080

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))


app.use(session({
  secret: 'qwerty',
  resave: true,
  saveUninitialized: true
}))





 app.get('/login', (req, res) => {
    return res.render('login') //EJS
   
}) 

app.get('/signup', (req, res) => {
  return res.render('signup') //EJS
 
}) 
app.post('/login', async (req, res) => {
  req.session.user = req.body.nombre
 console.log(req.session)
  return res.redirect('/') //EJS
 
})

const sessionOn = function(req, res, next) {
  if (!req.session.user)
    return res.redirect('/logout')
  else
    return next()
} 
app.get('/', sessionOn, (req, res) => {

  return res.render('home',{name:req.session.user}) //EJS
}) 

app.get('/logout', (req, res) => {
    const name = req.session.user
    return req.session.destroy(err => {
        if (!err) {
        return res.render('logout', {name:name}) //EJS
        }

        return res.render({ error: err })
    })
})

