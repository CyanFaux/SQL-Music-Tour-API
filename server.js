// DEPENDENCIES
const express = require('express')
const { Sequelize } = require('sequelize')
const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/")

/* // SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.DB_CONNECTION);

try {
        sequelize.authenticate();
        console.log(`Connected with Sequelize at ${process.env.DB_CONNECTION}`);
    } catch (err) {
        console.error(`Unable to connect to PostgreSQL: ${err}`);
    } */

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})
  
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})