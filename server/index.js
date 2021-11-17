const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//要留意係到一定要加 /api， 因為要同 React connect 係用方便好多
app.use("/api/user", authRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000.");
});
