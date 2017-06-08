const
  express = require('express'),
  app = express(),
  dotenv = require('dotenv').load({silent: true}),
  logger = require('morgan'),
  bodyParder = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  tasksRoutes = require('./routes/tasks.js'),
  listsRoutes = require('./routes/lists.js')
  cors = require('cors'),
  mongoURL = process.env.MONGODB_URL
  PORT = process.env.PORT

//Connect to mongodb
mongoose.connect(mongoURL, (err)=>{
  console.log(err || 'Now connected to the mongoDB');
})

//Log all incoming requests to the console
app.use(logger('dev'))

//Allow incoming ajax requests from other domains (including other localhost port)
app.use(cors())

//interpret bodies of data that are included in requests:
app.use(bodyParder.json()) //interpret json bodies
app.use(bodyParder.urlencoded({extended: false})) //interpret form data

//server root route:
app.get('/', (req, res)=>{
  res.json({message: 'Server root.'})
})

app.use('/api/users', usersRoutes)
app.use('/api/lists', listsRoutes)
// app.use('/api/lists/:id/tasks', tasksRoutes)

//Listen for incoming http request:
app.listen(PORT, (err)=>{
  console.log(err || `Server running on port ${PORT}`);
})
