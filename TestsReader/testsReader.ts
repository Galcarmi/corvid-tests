import path from "path";
import fs from "fs";

export async function runTests(folderPath:string) {
  // console.log(path.join(__dirname + '/../'))

  // const filePath = path.join(__dirname + '/target.js')
  // const s = fs.readFileSync(filePath, 'utf8');
  // const x = eval(s);
  console.log('run tests')

  fromDir(folderPath, /\.ct.js$/, function (filename: string) {
    console.log("-- found: ", filename);
    const s = fs.readFileSync(filename, "utf8");
    const x = eval(s);
  });

  const filePath = path.join(__dirname + '/../../../shit/storage.js')
  const s = fs.readFileSync(filePath, 'utf8');
  const x = eval(s);
}

function fromDir(startPath: string, filter: RegExp, callback: Function) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  }
}

runTests(path.join(__dirname + '/../../../'))
