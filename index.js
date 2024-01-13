require ("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express()

//Setters
app.set("PORT", process.env.PORT || 4001)

//middelware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//rutas
app.use("/colormind",require("./routes/colormind"))
app.use("/prodia",require("./routes/prodia"))


app.listen(app.get("PORT"),()=>{
    console.log(`Server listen a port: ${app.get("PORT")}`);
})
