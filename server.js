require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());
app.use(cookieParser());

// Body parser
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

// Hello World!
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});