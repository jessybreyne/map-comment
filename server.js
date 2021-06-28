const express = require('express')
const db = require('./config/db')
require('dotenv').config({ path: './config/.env' })
const app = express()
const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  let {firstName, lastName, email, password} = req.body;
  let hash = await bcrypt.hashSync(password, 10);
  let user_id = await db('user').insert({firstName, lastName, email, password: hash});
  let user = await db.select("*").from('user').where({id:user_id});
  console.log(user);
  res.json(user);
});

app.get('/users', async (req, res) => {
  let user = await db.select("*").from('user');
  console.log(user);
  res.json(user);
});

// routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`)
})