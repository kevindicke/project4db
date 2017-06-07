const
  express = require('express'),
  List = require('../models/List.js'),
  authorize = require('../config/serverAuth').authorize,
  listsRouter = new express.Router(),
  tasksRoutes = require('./tasks.js')


listsRouter.use(authorize)

listsRouter.route('/')
  .get((req, res)=>{
    List.find({user: req.decoded._id}, (err, lists)=>{
      if(err) return console.log(err);
      res.json(lists)
    })
  })
  .post((req, res)=>{
    const newList = new List(req.body)
    newList.user = req.decoded
    newList.save((err, list)=>{
      if(err) return console.log(err);
      res.json({success: true, message: 'New list creates', list})
    })
  })

  listsRouter.route('/:id')
    .get((req, res)=>{
      List.findById(req.params.id).populate('tasks').exec((err, list)=>{
        if(err) return console.log(err);
        res.json(list)
      })
    })
    .patch((req, res)=>{
      List.findById(req.params.id, (err, list)=>{
        list.title = req.body
        list.save((err, list)=>{
          if(err) return console.log(err);
          res.json({success: true, message: 'list edited', list})
        })
      })
    })
    .delete((req, res)=>{
      List.findByIdAndRemove(req.params.id, (err, list)=>{
        if(err) return console.log(err);
        res.json({success: true, message: 'list deleted', list})
      })
    })

listsRouter.use('/:id/tasks', tasksRoutes)

module.exports = listsRouter
