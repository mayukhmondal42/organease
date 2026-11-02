const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Not Connected: " + err.message);
  });