if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()
const express = require("express")
const cors = require('cors')
const routes = require('../routes/routes')
const mongoose = require('mongoose')
const session = require('express-session')

var passport = require('passport');
var Auth0Strat = require('passport-auth0')

var strat = new Auth0Strat({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, function(accessToken, refreshToken, extraParams, profile, done)
{
    return done(null, profile);
});

const app = express()
var sess = {
    Secret:"Some Secret",
    cookie: {},
    resave: false,
    saveUninitialized: true
}

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParse: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('DB is now connected'))

app.listen(process.env.PORT, () => {
    console.log("server is running...")
})

passport.use(strat);
app.use(passport.initialize())
app.use(passport.session());