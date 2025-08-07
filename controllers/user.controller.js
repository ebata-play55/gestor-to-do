class UserController {

    constructor(conn) {
        this.conn = conn
    }

    async getUsers() {
        return await new Promise((resolve, reject) => {
            this.conn.query('select * from users', (err, result) => {
                
                if (err) return reject(err)

                return resolve(result)

            })
        })
    }

    async getUserId(id) {
        return await new Promise((resolve, reject) => {
            this.conn.query(`select * from users where id = ${id}`, (err, result) => {

                if (err) return reject(err)

                if (result.length === 0) return resolve('user not found!')

                return resolve(result)
            })
        })
    }

    async postUSer({ name, email, senha }) {
        return await new Promise((resolve, reject) => {
            this.conn.query(`insert into users (name, email, senha) values ("${name}","${email}", "${senha}");`, (err, result) => {

                if (err) reject(err)

                return resolve("usuário criado!")

            })
        })
    }

    async updatePartial(id, { name, email, senha }) {
        
        let user = await this.getUserId(id)

        if (typeof user !== 'object')
            return user

        let body //da pra melhorar isso utilizando array com join, evita ter que remover o undefined no inicio caso aconteça
        if (name) body = `name = "${name}"`

        if (email) body += `, email = "${email}"`

        if (senha) body += `, senha = "${senha}"`

        body = body.replace("undefined, ", "")

        user = await new Promise((resolve, reject) => { 
            this.conn.query(`update users set ${body} where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })

        if(user.affectedRows > 0)
            return await this.getUserId(id)
        
        return user

    }

    async update(id, { name, email, senha }) {
        
        let user = await this.getUserId(id)

        if (typeof user !== 'object')
            return user

        if(name === undefined || email === undefined || senha === undefined)
            return "{status: campos obrigatórios em falta! Verfique name, email e senha}"
        

        user = await new Promise((resolve, reject) => { 
            this.conn.query(`update users set name = "${name}", email = "${email}", senha = "${senha}" where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })

        if(user.affectedRows > 0)
            return await this.getUserId(id)
        
        return user

    }

    remove(id) {
        return new Promise(async (resolve, reject) => {

            const user = await this.getUserId(id)

            if (typeof user !== 'object')
                return reject(user)

            await this.conn.query(`delete from users where id = ${id}`, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    }
}

module.exports = UserController