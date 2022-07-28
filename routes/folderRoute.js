const express = require('express'),
router = express.Router() // שניהם חייבים להיות

const folderLogic = require("../BL/folderLogic")
// const authJWT = require("../middleware/auth")
router.post('/addNew', async (req, res)=>{
    try{
      const result = await folderLogic.createFolder(req.body)
      res.send(result)
    }
    catch (err){
        res.status(err.code).send(err)
    }
})