const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reply = require('./private/utils/reply');
const PORT = process.env.PORT || 5000;

// Services
const indicators = require('./private/routes/indicators.router');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

// Whitelist server and enable CORS
// TO-DO: Add config with all whitelisted servers
var whitelist = [
  '127.0.0.1'
];

app.use((req, res, next) => {
  let ip = req.headers['x-real-ip'] !== undefined ? req.headers['x-real-ip'] : '127.0.0.1';

  let isLocal = ip == '127.0.0.1' || req.headers.origin === undefined;
  let canReply = whitelist.indexOf(ip) !== -1;
  let origin = canReply ? (!isLocal ? req.headers.origin : '*') : '';
  
  if (canReply) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Max-Age', '60');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    return next();
  } else {
    return res.json(reply.error('This is CORS-enabled for a whitelisted domain.'));
  }
});
  

app.get('/', (req, res) => { res.json({ status: 'OK' }) });

// Set urls from API
// TO-DO: Add post urls (dynamically) by reading API response
app.use('/indicators', indicators);

// 404 error
app.use((req, res) => res.status(404).json(reply.error('SERVICE_NOT_FOUND')));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
