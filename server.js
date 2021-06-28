const express = require('express')
const db = require('./config/db')
require('dotenv').config({ path: './config/.env' })
const app = express()
const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`)
})