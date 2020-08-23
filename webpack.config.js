const path = require("path");
module.exports = {
    entry:"./dist/index.js",
    mode:"production",
    target:"node",
    output:{
        filename:"corvid-tests.js",
        path:path.resolve(__dirname+"/dist"),
        libraryTarget:"commonjs2"
    }
}