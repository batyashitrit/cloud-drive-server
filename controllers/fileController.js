const fs = require("fs");
const path = require('path')

function create(fileName, content) {
  fs.writeFileSync("folders/" + fileName, `\n${content}`, {
    encoding: "utf-8",
  });
  console.log("End write to file");
}

function read(path) {
  const result = fs.readdirSync(path, { encoding: "utf-8" });
  console.log("file was readed");
  return result;
}
//   const isFile = fileName => {
//     return fs.lstatSync(fileName).isFile();
//   };
// const folderPath = "folders";

//   fs.readdirSync(folderPath, { encoding: "utf-8" })
//     .map(fileName => {
//       return path.join(folderPath, fileName);
//     })
//     .filter(isFile);
// fs.readdirSync(folderPath).map(fileName => {
//     return path.join(folderPath, fileName);
//   });



module.exports = { create, read };
//
