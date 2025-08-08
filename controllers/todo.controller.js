class TodoController {
    
    constructor(conn){
        this.conn = conn
    }
    
    async findAll() {
        return await new Promise((resolve, reject) => {
            this.conn.query('select * from todos', (err, result) => {
                
                if (err) return reject(err)

                return resolve(result)

            })
        })
    }

    async findOneById(id) {
        return await new Promise((resolve, reject) => {
            this.conn.query(`select * from todos where id = ${id}`, (err, result) => {

                if (err) return reject(err)

                if (result.length === 0) return resolve('todo not found!')

                return resolve(result)
            })
        })
    }

    async post({ userid, titulo, status }) {
        return await new Promise((resolve, reject) => {
            this.conn.query(`insert into todos (userid, titulo, status) values ("${userid}","${titulo}", "${status}");`, (err, result) => {

                if (err) reject(err)

                return resolve("todo criado!")

            })
        })
    }

    async patch(id, { userid, titulo, status }) {
        
        let todo = await this.findOneById(id)

        if (typeof todo !== 'object')
            return todo

        let body //da pra melhorar isso utilizando array com join, evita ter que remover o undefined no inicio caso aconteça
        if (userid) body = `userid = "${userid}"`

        if (titulo) body += `, titulo = "${titulo}"`

        if (status) body += `, status = "${status}"`

        body = body.replace("undefined, ", "")

        todo = await new Promise((resolve, reject) => { 
            this.conn.query(`update todos set ${body} where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })

        if(todo.affectedRows > 0)
            return await this.findOneById(id)
        
        return todo

    }

    async put(id, { userid, titulo, status }) {
        
        let todo = await this.findOneById(id)

        if (typeof todo !== 'object')
            return todo

        if(userid === undefined || titulo === undefined || status === undefined)
            return "{status: campos obrigatórios em falta! Verfique userid, titulo e status}"
        

        todo = await new Promise((resolve, reject) => { 
            this.conn.query(`update todos set userid = "${userid}", titulo = "${titulo}", status = "${status}" where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })

        if(todo.affectedRows > 0)
            return await this.findOneById(id)
        
        return todo

    }

    remove(id) {
        return new Promise(async (resolve, reject) => {

            const todo = await this.findOneById(id)

            if (typeof todo !== 'object')
                return reject(todo)

            await this.conn.query(`delete from todos where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    }
}

module.exports = TodoController