const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 80;
const HOST = '0.0.0.0';


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Content-Type', 'text/html');
    next();
  });

app.get('/', (req, res) => {
    res.send(Buffer.from(`<h2>Hello</h2><b>Hostname:</b>${req.hostname}<br/>`));
});
  

app.listen(process.env.PORT || PORT, function() {
    console.log('server running on port 3000', '');
});
