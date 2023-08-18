const express = require('express');
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

app.use('/api', limiters.appLimiter)
app.use('/api/account', routes.accountRoutes);
app.use('/api/todos', routes.todoRoutes);


app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  await init()
});