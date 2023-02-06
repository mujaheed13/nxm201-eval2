const express = require("express");
const app = express();
const { connection } = require("./configs/mongoose.connection.js");
const { userRouter } = require("./routes/user.route.js");
const { goldRouter } = require("./routes/goldrates.route.js");
const { authenticate } = require("./middlewares/authenticate.js");
const cookieParser = require("cookie-parser");
const { newTokenRouter } = require("./routes/getnewtoken.route.js");
const { userStatsRouter } = require("./routes/userstats.route.js");
require("dotenv").config();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/users", userRouter);
app.use("/goldrate", authenticate);
app.use("/goldrate", goldRouter);
app.use("/getnewtoken", newTokenRouter);
app.use("/userstats", authenticate);
app.use("/userstats", userStatsRouter);

app.get("/", (req, res)=>{
    res.status(200).json("Home Page");
})

//To handle Invalid end points
app.get("*", (req, res) => {
    res.status(404).json("Invalid End Point")
})

app.listen(process.env.port, async()=>{
    console.log(`Server is running at http://localhost:${process.env.port}`);
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        
    }
})