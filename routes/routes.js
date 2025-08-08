const express = require('express')
const router = express.Router()

const conn = require('../database/connection')

const UserController = require('../controllers/user.controller')
const userController = new UserController(conn)

const TodoController = require('../controllers/todo.controller')
const todoController = new TodoController(conn)

//=== USERS =====================================

router.get('/users', (req, res) => {
    userController.getUsers().then(result => res.json(result)).catch(err => res.json(err))
})

router.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)

    userController.getUserId(id).then(result => res.json(result)).catch(err => res.json(err))

    // res.send( await userController.getUserId2(id))

})

router.post('/user', (req, res) => {
    userController.postUSer(req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.patch('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    userController.updatePartial(id, req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    userController.update(id, req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    userController.remove(id).then(result => res.json(result)).catch(err => res.json(err))
})

//=== TODOS =====================================

router.get('/todos', (req, res) => {
    todoController.findAll().then(result => res.json(result)).catch(err => res.json(err))
})

router.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    todoController.findOneById(id).then(result => res.json(result)).catch(err => res.json(err))
})

router.post('/todo', (req, res) => {
    todoController.post(req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.patch('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    todoController.patch(id, req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    todoController.put(id, req.body).then(result => res.json(result)).catch(err => res.json(err))
})

router.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    todoController.remove(id).then(result => res.json(result)).catch(err => res.json(err))
})

module.exports = router