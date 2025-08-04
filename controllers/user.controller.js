const { users, todos } = require('../models/memory')

//=== USERS =====================================

function getUsers(req, res) {
    res.send(users)
}

function getUserId(req, res) {

    const id = parseInt(req.params.id)

    let encontrado

    users.forEach(user => {
        if (user.id === id)
            encontrado = user
    })

    if (encontrado)
        res.send(encontrado)

    else
        res.send('user not found!')

}

function postUSer(req, res) {
    users.push(req.body)
    res.send('usuario criado')
}

//=== TODOS =====================================

function getTodos(req, res) {
    res.json(todos)
}

function getTodoId(id) {

    let encontrado
    todos.forEach(todo => {
        if (todo.id === id)
            encontrado = todo
    })

    if (encontrado)
        return encontrado
    else
        return 'todo not found!'
}

function postTodo(req, res) {

    todos.push(req.body)
    res.send('Todo criado')

}

function putTodo(req, res) {

    const id = parseInt(req.params.id)

    let todo = getTodoId(id)

    if (typeof todo === "object") {
        todo.usuarioId = req.body.usuarioId
        todo.titulo = req.body.titulo
        todo.status = req.body.status

        res.send('todo atualizado')
    }
    else
        res.send(todo)
}

function patchTodo(req, res) {

    const id = parseInt(req.params.id)

    let todo = getTodoId(id)

    if (typeof todo === "object") {

        if (req.body.usuarioId !== undefined)
            todo.usuarioId = req.body.usuarioId

        if (req.body.titulo !== undefined)
            todo.titulo = req.body.titulo

        if (req.body.status !== undefined)
            todo.status = req.body.status

        res.send('todo atualizado')
    }
    else
        res.send(todo)

}

function deleteTodo(req, res){
    const id = parseInt(req.params.id)

    let index;
    let remover = false;
    
    for(let i=0; i<todos.length; i++){
        if(todos[i].id === id){
            index = i;
            remover = true;
        }
    }

    if(remover)
        res.send(todos.splice(index, 1))
    
    else
        res.send('todo not found!')

}

module.exports = {
    getUsers,
    getUserId,
    postUSer,
    getTodos,
    getTodoId,
    postTodo,
    putTodo,
    patchTodo,
    deleteTodo
}