const helmet = require("helmet");
const cors = require("cors");

const appMiddleware = (express, app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
};

module.exports = appMiddleware;
