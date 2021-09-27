const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const PORT = 3000;
const HOST = '0.0.0.0';


const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Content-Type', 'text/html');
    next();
  });

  client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits);
    })
})

app.get('/stat', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits + 1)
        client.set('visits', parseInt(visits) + 1)
    })
})

app.get('/about', (req, res) => {
    res.send(Buffer.from(`<h2>Hello, ${req.hostname}</h2><b>Hostname:</b>${req.hostname}<br/>`));
});
  

app.listen(process.env.PORT || PORT, function() {
    console.log('server running on port 3000', '');
});
