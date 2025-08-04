const express = require('express')
const router = express.Router()
const {getUsers, getUserId, postUSer, getTodos, getTodoId, postTodo, putTodo, patchTodo, deleteTodo } = require('../controllers/user.controller')

//=== USERS =====================================

router.get('/users', getUsers)

router.get('/user/:id', getUserId)

router.post('/user', postUSer)

//=== TODOS =====================================

router.get('/todos', getTodos)

router.get('/todo/:id', (req, res) => {

    const resp = getTodoId(parseInt(req.params.id))

    res.send(resp)

})

router.post('/todo', postTodo)

router.put('/todo/:id', putTodo)

router.patch('/todo/:id', patchTodo)

router.delete('/todo/:id', deleteTodo)

module.exports = router