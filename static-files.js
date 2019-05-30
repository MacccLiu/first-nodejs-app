const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: '/static'
// dir: __dirname + '/static'
function staticFiles(url, dir){
    return async (ctx, next) => {
        var rpath = ctx.request.path;
        if (rpath.startsWith(url)) {
            var fp = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(fp)) {
                // find file's mime:
                ctx.response.type = mime.getType(rpath);
                // load file's context and assign to response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // file not found:
                ctx.response.status = 404;
            }
        } else {
            // not the prefix, deal with the next middleware:
            await next();
        }
    };
}

module.exports = staticFiles;