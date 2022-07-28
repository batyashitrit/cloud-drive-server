const express = require('express')
const router = express.Router()// שולט על כל הניתובים, הניתוב הראשי

const multer = require('multer'),
upload = multer()
// router.use('/', require('./fileRoute'))

// folder

const folderLogic = require("../BL/folderLogic")
const fileLogic = require("../BL/fileLogic")
// const authJWT = require("../middleware/auth")

router.post('/addNew', async (req, res)=>{
    try {
        await folderLogic.createNewFolder("folders/"+ req.body.folderName)
        res.send("created")}
    catch (err){
        res.status(err.code).send(err)
    }
})


router.post('/addNew/:folderName', async (req, res)=>{
    console.log(req.body.folderName); 
    console.log("***" , req.params.folderName);
    console.log(`${req.params.folderName}/` + req.body.folderName);
    try {
        await folderLogic.createNewFolder("folders/"+`${req.params.folderName}/` + req.body.folderName)
        res.send("created")}
    catch (err){
        res.status(err.code).send(err)
    }
})

// router.get("/getAllFolders/:folderName", async(req,res) =>{
//     console.log("*******" ,req.params.folderName);
//     try{

//             const result = await folderLogic.getFolders(`${req.params.folderName}`)
//             res.status(200).send(result)

//         }
router.get("/getAllFolders", async(req,res) =>{
    try{
        const result = await folderLogic.getFolders("folders")
        res.status(200).send(result)
    }
    catch (error){
        console.log("get", error)
        if (error.code && error.code < 1000) {
            res.status(error.code).send(error.message)
        } else {
          res.send("something went wrong");
        }
    }
  })

  router.get("/getAllFolders/inside/:folderName", async(req,res) =>{
    try{
        const result = await folderLogic.getFolders(`folders/${req.params.folderName}`)
        res.status(200).send(result)
    }
    catch (error){
        console.log("get", error)
        if (error.code && error.code < 1000) {
            res.status(error.code).send(error.message)
        } else {
          res.send("something went wrong");
        }
    }
  })

  router.delete("/:folderName", async (req, res) => {
    console.log(req.params.folderName);
    try {
         await folderLogic.remove("folders/" + req.params.folderName)
         res.send("deleted")
    } catch (err) {
      console.log(err);
    res.status(400).json(err || "error");
  }
});

router.put("/:folderName", async (req, res) => {
    console.log(`folders/${req.params.folderName}`);
    try {
         await folderLogic.updateName(`folders/${req.params.folderName}`, req.body.newFolderName)
         res.send("updated")
    } catch (err) {
      console.log(err);
    res.status(400).json(err || "error");
  }
});

  //files

  router.post("/upload",upload.single('File'), async (req, res) => {
    try {
        const {file} = req
        console.log(file.originalname);
       await fileLogic.createNewFile(file.originalname, file.size/ 1024)
         res.sendStatus(200)
    } catch (err) {
        res.status(err.code).send(err)
  }
});

router.post("/upload/inside/:folderName",upload.single('File2'), async (req, res) => {
    try {
        const {file} = req
        console.log(`${req.params.folderName}/`+ file.originalname);
       await fileLogic.createNewFile(`${req.params.folderName}/`+ file.originalname, file.size/ 1024)
         res.sendStatus(200)
    } catch (err) {
        res.status(err.code).send(err)
  }
});

router.get("/getAllFiles/:folderName", async(req,res) =>{
    try{
        const result = await fileLogic.getFiles(`${req.params.folderName}`)
        res.status(200).send(result)
    }
    catch (err){
        res.status(err.code).send(err)
        }
    })

    router.get("/getAllFiles/inside/:folderName", async(req,res) =>{
        try{
            const result = await fileLogic.getFiles(`folders/${req.params.folderName}`)
            res.status(200).send(result)
        }
        catch (err){
            res.status(err.code).send(err)
            }
        })

        router.delete("/:fileName", async (req, res) => {
            console.log(req.params.folderName);
            try {
                 await folderLogic.remove("folders/" + req.params.fileName)
                 res.send("deleted")
            } catch (err) {
              console.log(err);
            res.status(400).json(err || "error");
          }
        });
        router.delete("/:folderName/:fileName", async (req, res) => {
            console.log(req.params.folderName + '/' + req.params.fileName);
            try {
                 await folderLogic.remove("folders/"+ req.params.fileName)
                 res.send("deleted")
                //  req.params.folderName
            } catch (err) {
              console.log(err);
            res.status(400).json(err || "error");
          }
        });
module.exports = router