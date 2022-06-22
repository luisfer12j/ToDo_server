const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { globalErrorHandler } = require('./controllers/errors.controller');

const { usersRouter } = require('./routes/users.routes');


const router = express.Router();

//Controllers

//Routers

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 60 * 1000,
    message: 'Too many request from this IP'
})
app.use(limiter);

//Endpoints

app.use('/api/v1/users', usersRouter);


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/utils/index.html'))
})
// Global error handler
app.use('*', globalErrorHandler);


module.exports = { app }