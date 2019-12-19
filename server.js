const express = require("express");
const app = express();
const dbConnection = require("./config/db");
const appMiddleware = require("./appMiddleware");
const login = require("./controller/login");
const user = require("./routes/user");
const charger = require("./routes/charger");
const path = require("path");
const csvToJson = require("convert-csv-to-json");
const fileDir = path.join(__dirname, "stationsList", "stationsList.csv");

const PORT = process.env.PORT || 5000;

appMiddleware(express, app);
app.use("/api/login", login);
//user related api
app.use("/api/user", user);
app.use("/api/charger", charger);
app.get("/api/data", (req, res) => {
  let jsonData = csvToJson
    .fieldDelimiter(",")
    .formatValueByType()
    .getJsonFromCsv(fileDir);
  res.json(jsonData.slice(0, 20));
});

// app.use(express.static(path.join(__dirname, "client/build")));

dbConnection();

app.listen(PORT, () => {
  console.log("App is served on port : " + PORT);
});
