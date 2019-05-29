// use Koa framework, in Koa2, Koa is a Class
const Koa = require('koa');
const app = new Koa(); // init Koa

// use koa-bodyparser to get the body object of all POSTs
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// add my own routing
const controller = require('./controller');
app.use(controller());

// listen port3000
app.listen(3000);

console.log('Nodejs-koa2 server started at port 3000...');
