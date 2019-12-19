require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const dbConnection = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("connected to database");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = dbConnection;
