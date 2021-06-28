const express = require('express');
require('dotenv').config({ path: './config/.env' });
const app = express();
const userRoutes = require('./routes/user.routes');

// Body parser
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

// Hello World!
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});