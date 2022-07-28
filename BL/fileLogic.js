const fileController = require("../controllers/fileController");
const fs = require("fs");

function isValidExtantions(filename = "") {
    let ext = filename.slice(filename.lastIndexOf(".") + 1)
    return ["pdf", "txt", "jpg"].find(char => ext == char) ? true : false;
}

function isValidSize(fileSize){
    return (fileSize > 1000) ? false : true
}

async function createNewFile(fileName, fileSize) {
    console.log(fileSize);
    let result = await isValidExtantions(fileName) && await isValidSize(fileSize)
    console.log(result);
  if (!result) {
    throw {code: 410, msg: "file size or extanction is not valid"}
  } else {
    await fileController.create(fileName);
    return "the folder created";
  }
}

async function getFiles(fileName){
    let result = await fileController.read(fileName)
    let filteredResult = result.filter(v=> v.includes("."))
    if(!result) throw ({code : 404, message: "not found"})
    return filteredResult
    }


module.exports = {createNewFile, getFiles}