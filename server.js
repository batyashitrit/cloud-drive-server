const express = require("express"),
 app = express(),
 PORT = process.env.PORT || 5000;

app.use(require("cors")())
app.use(express.json())

const mainRouter = require("./routes/mainRoute")
app.use("/cloud-drive", mainRouter)

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
