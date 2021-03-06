require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const locationRoutes = require('./routes/location.routes');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
// OpenAPI
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

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

// UI OpenAPI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// jwt
app.all('*', checkUser);
app.get('/jwtid', requireAuth, checkUser, (req, res) => {
    console.log("user jwtid", res.locals.user)
    res.status(200).json(res.locals.user.id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/location', locationRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});