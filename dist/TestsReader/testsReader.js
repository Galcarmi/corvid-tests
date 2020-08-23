"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTestsReader = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
async function executeTestsReader() {
    // console.log(path.join(__dirname + '/../'))
    // const filePath = path.join(__dirname + '/target.js')
    // const s = fs.readFileSync(filePath, 'utf8');
    // const x = eval(s);
    console.log('run tests');
    const folderPath = path_1.default.join(__dirname + '/../../../../');
    await fromDir(folderPath, /\.ct.js$/, async (filename) => {
        console.log("-- found: ", filename);
        const s = fs_1.default.readFileSync(filename, "utf8");
        const x = eval(s);
        await index_1.testSuiteManager.waitForAsyncTestsToBeResolved();
    });
}
exports.executeTestsReader = executeTestsReader;
async function fromDir(startPath, filter, callback) {
    if (!fs_1.default.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    var files = fs_1.default.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path_1.default.join(startPath, files[i]);
        var stat = fs_1.default.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename))
            await callback(filename);
    }
}
