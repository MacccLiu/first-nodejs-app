var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.username || '';
    var password = ctx.request.body.password || '';

    if (name === 'nan' && password === '1205'){
        ctx.render('signin-ok.html', {
            title: 'Success',
            name: 'Nan'
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Failed'
        });
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}