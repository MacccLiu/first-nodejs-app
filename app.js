// use Koa framework, in Koa2, Koa is a Class
const Koa = require('koa');
const app = new Koa(); // init Koa

const isProduction = process.env.NODE_ENV === 'production';
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

// 1. echo URL and response time
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var 
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 2. middleware of loading files in 'static' folder
if (!isProduction){
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// 3. middleware of using koa-bodyparser to handle the POST body
app.use(bodyParser());

// 4. middleware of loading files in 'views' folder
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
}));

// 5. middleware of mapping url with files/functions in 'controllers' folder
app.use(controller());




// listen port3000
app.listen(3000);

console.log('Nodejs-koa2 server started at port 3000...');
