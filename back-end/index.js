const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reply = require('./private/utils/reply');
const PORT = process.env.PORT || 5000;

// Services
const indicators = require('./private/routes/indicators.router');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

app.get('/', (req, res) => { res.json({ status: 'OK' }) });

// Set urls from API
// TO-DO: Add post urls (dynamically) by reading API response
app.use('/indicators', indicators);

// 404 error
app.use((req, res) => res.status(404).json(reply.error('SERVICE_NOT_FOUND')));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
