// require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const dbConnection = () => {
  mongoose
    .connect(
      /*process.env.DB_URI*/ "mongodb://Shubhashish:e1ectriccar@ds155934.mlab.com:55934/e-car",
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
