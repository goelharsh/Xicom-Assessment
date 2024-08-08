const express = require("express")
const app = express()

const userRoutes = require("./routes/User")
const database = require("./config/db")
const cors = require("cors")
const {cloudinaryConnect}  = require("./config/cloudinary")
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const PORT  = process.env.PORT ||4000;
dotenv.config()

database.connect()
app.use(bodyParser.json()); // Use bodyParser for JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)

cloudinaryConnect();

app.use("/api/v1/user", userRoutes)

app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})


app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})