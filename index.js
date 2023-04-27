const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);


app.listen(8000, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("server is listening at port 8000");
})