const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  username: { type: String, trim: true },
  password: { type: String, trim: true },
  charger:[{type: mongoose.Schema.Types.ObjectId, ref: 'Charger'}]
});

userSchema.methods.generateAuthToken = function() {
  const expireTime = Date.now() + 900000;
  const token = jwt.sign(
    {
      id: this.id,
      username: this.username,
      expireTime: expireTime,
    },
    "process.env.JWT_PRIVATE_KEY"
  );
  return token;
};

function validateUser(user) {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),

    password: Joi.string()
      .min(3)
      .max(1024)
      .required(),
  };
  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);
module.exports = { userSchema, validateUser, User };
