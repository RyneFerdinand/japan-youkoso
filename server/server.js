require("dotenv").config();

const connection = require("./config/database");
const express = require("express");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is up, listening to port ${port}...`);
});
