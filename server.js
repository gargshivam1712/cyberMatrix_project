const app = require('express')()
const server = require('http').createServer(app)
const dotenv = require('dotenv')
const bodyParser = require('body-parser')


// define config
dotenv.config()

// apply middleware
app.use(bodyParser.json())

// create and start database
require('./models')

// define route
const userRoute = require('./routes/user')
app.use('/api/user',userRoute)

// start server
const PORT =  process.env.PORT || 8080
server.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`)
})