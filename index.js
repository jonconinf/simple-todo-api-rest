const express = require('express');
const ip = require('ip');
require('dotenv').config();
const bodyParser = require('body-parser');

const routes = require('./src/routes')
const db = require("./src/config/database")
const limiters = require('./src/middleware/limiters')
const app = express();

const PORT = process.env.HTTP_PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const init = async () => {
  db.init()
}

app.use('/', limiters.appLimiter)
app.use('/api/users', routes.accountRoutes);
app.use('/api/todos', routes.todoRoutes);


app.listen(PORT, async () => {
  console.log(`Server running on ${ip.address()}:${PORT}`);
  await init()
});