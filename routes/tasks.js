const
  express = require('express'),
  List = require('../models/List.js'),
  Task = require('../models/Task.js'),
  authorize = require('../config/serverAuth').authorize,
  tasksRouter = new express.Router({mergeParams: true})

tasksRouter.use(authorize)
tasksRouter.get('/:taskId', (req, res)=>{
  res.json(req.params)
})

tasksRouter.route('/')
  .get((req, res)=>{
    Task.find({user: req.decoded._id}, (err, tasks)=>{
      if(err) return console.log(err);
      res.json(tasks)
    })
  })
  .post((req, res)=>{
    List.findById(req.params.id, (err, list) => {
      const newTask = new Task(req.body)
      newTask.user = req.decoded
      newTask.list = list
      newTask.save((err, task)=>{
        list.tasks.push(task)
        list.save((err, list) => {
          if(err) return console.log(err);
          res.json({success: true, message: 'New task created', task})
        })
      })
    })
  })

tasksRouter.route('/:taskId')
  .get((req,res)=>{
    Task.findById(req.params.taskId, (err, task)=>{
      if(err) return console.log(err);
      res.json(task)
    })
  })
  .patch((req, res)=>{
    Task.findById(req.params.taskId, (err, task)=>{
      task.completed = !task.completed
      task.save((err, task)=>{
        if(err) return console.log(err);
        res.json({success: true, message:'Task completed', task})
      })
    })
  })
  .delete((req, res)=>{
    Task.findByIdAndRemove(req.params.taskId, (err, task)=>{
      if(err) return console.log(err);
      res.json({success: true, message: 'Task deleted', task})
    })
  })

module.exports = tasksRouter
