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


module.exports = router