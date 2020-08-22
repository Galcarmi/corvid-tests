"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function runTests(folderPath, executeLastPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(path.join(__dirname + '/../'))
        // const filePath = path.join(__dirname + '/target.js')
        // const s = fs.readFileSync(filePath, 'utf8');
        // const x = eval(s);
        console.log('run tests');
        fromDir(folderPath, /\.ct.js$/, function (filename) {
            console.log("-- found: ", filename);
            const s = fs_1.default.readFileSync(filename, "utf8");
            const x = eval(s);
        });
        //   const filePath = path.join(__dirname + '/../../../shit/storage.js')
        const s = fs_1.default.readFileSync(executeLastPath, 'utf8');
        const x = eval(s);
    });
}
exports.runTests = runTests;
function fromDir(startPath, filter, callback) {
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
            callback(filename);
    }
}
