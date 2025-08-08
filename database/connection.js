const mysql = require('mysql')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projetotodo',
    password: 'master'
})

conn.connect((erro) => {
    if(erro) throw erro
    console.log('Conectou!')
})

// conn.query('use projetotodo', (erro, resultado) => {
//     if(erro) throw erro
//     console.log(resultado)
// })

module.exports = conn