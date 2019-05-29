const fs = require('fs');

// reading all js files in controller folder
function addController(router){
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter( (f) => {
        return f.endsWith('.js');
    } );

    for(var f of js_files){
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

function addMapping(router, mapping) {
    for(var url in mapping){
        if (url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

module.exports = function (dir) {
    let controller_dir = dir || 'controllers';
    let router = require('koa-router')();
    addController(router, controller_dir);
    return router.routes();
}