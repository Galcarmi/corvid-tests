import path from "path";
import fs from "fs";
import { TestSuiteManager } from "../TestObjects/TestSuiteManager/TestSuiteManager";

export async function executeTestsReader(i_FolderPath:string | undefined,tsm:TestSuiteManager) {
  // console.log(path.join(__dirname + '/../'))

  // const filePath = path.join(__dirname + '/target.js')
  // const s = fs.readFileSync(filePath, 'utf8');
  // const x = eval(s);
  console.log('run tests')
  if(i_FolderPath === 'frontend'){
    i_FolderPath = '/user-code/public'
  }
  else if (i_FolderPath ==='backend'){
    i_FolderPath = '/user-code/backend'
  }
  console.log('executeTestsReader')
  const folderPath = i_FolderPath || path.join(__dirname + '/../../../../');
  await fromDir(folderPath, /\.ct.js$/, async (filename: string) => {
    console.log("-- found: ", filename);
    const s = fs.readFileSync(filename, "utf8");
    const x = eval(s);
    await tsm.waitForAsyncTestsToBeResolved();
    
  });
}

async function fromDir(startPath: string, filter: RegExp, callback: Function) {
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
    } else if (filter.test(filename)) await callback(filename);
  }
}
