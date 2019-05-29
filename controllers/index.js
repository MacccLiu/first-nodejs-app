var fn_index = async (ctx, next) => {
    ctx.response.body = 
    `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="nan"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var password = ctx.request.body.password || '';

    if (name === 'nan' && password === '1205'){
        ctx.response.body = `<h1>Welcome, ${name}!`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}