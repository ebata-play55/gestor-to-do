const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const router = require('./routes/routes')

app.use(router)

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
}) 