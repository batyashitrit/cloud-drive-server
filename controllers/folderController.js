const fs = require('fs');
const path = require('path')
function create(fileName, content){
        fs.writeFileSync(fileName,`\n${content}`, {encoding:"utf-8"})
        console.log("End write to file")}
        

function createFolder(folderName){
    fs.mkdirSync("folders/" +folderName, {encoding:"utf-8"})
    console.log("End create folder")}


    function read(Path){
        const result = fs.readdirSync(Path, {encoding:"utf-8"})
        console.log("file was readed")
        return result
    }

    function update(fileName, newFileName){
    fs.renameSync((fileName, newFileName), {encoding:"utf-8"})
    console.log("file was updated")
    return ("updated")}
    


module.exports = {createFolder, create, read, update}