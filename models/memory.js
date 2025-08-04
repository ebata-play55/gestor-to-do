//function users
const users = [
  { id: 1, nome: 'Fulano1', email: 'fulano1@email.com', senha: '1' },
  { id: 2, nome: 'Fulano2', email: 'fulano2@email.com', senha: '2' }
]

const todos = [
    { id: 1, usuarioId: 1, titulo: 'Fazer café', status: 'pendente' },
    { id: 2, usuarioId: 2, titulo: 'Fazer café', status: 'pendente' }    
]

module.exports = {users, todos}