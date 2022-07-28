const folderConrollers = require("../controllers/folderController");
const fs = require("fs");

function isExist(filename) {
    return fs.existsSync(filename);
}

async function createNewFolder(folderName) {
    let newFolder = fs.existsSync(folderName)
  if (newFolder) {
    throw {code: 410, msg: "The folder is already exist"}
  } else {
    await folderConrollers.createFolder(folderName.slice(7));
    return "the folder created";
  }
}

// async function createFile(folderName) {
//   await folderConrollers.createFolder({ folderName });
//   // if(!result) throw ({code : 404, message: "not found"})
//   return "the folder created";
// }

async function getFolders(folderName){
    let result = await folderConrollers.read(folderName)
    let filteredResult = result.filter(v=> (!v.includes(".")))
    if(!result) throw ({code : 404, message: "not found"})
    return filteredResult
    }

    function remove(fileName){
      fs.rmSync(fileName)
      console.log("file was deleted");
  }

  async function updateName(fileName, newFileName){
    if(isExist){
await folderConrollers.update(fileName,newFileName, {encoding:"utf-8"})
console.log("file was updated")
return ("updated")}
else{
    console.log("file is not exist");

}
}
module.exports = { createNewFolder, getFolders, remove, updateName };
