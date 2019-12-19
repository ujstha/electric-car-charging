const mongoose = require("mongoose");
const Joi = require("joi");

const chargerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  chargingStation: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true, lowercase: true },
  latitude: { type: Number },
  longitude: { type: Number },
  connectorType: { type: String, trim: true, lowercase: true },
  startTime: { type: Number, default: 0 },
  endTime: { type: Number, default: 0 },
  chargingTime: { type: String, trim: true, lowercase: true},
  totalCost: { type: Number, default: 0 },
});

function chargerSchemaValidator(chargingDetail) {
  schema = {
    chargingStation: Joi.string()
      .min(1)
      .max(255)
      .required(),
    address: Joi.string()
      .min(1)
      .max(255)
      .required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    connectorType: Joi.string()
      .min(1)
      .max(255),
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
    chargingTime: Joi.string().required(),
    totalCost: Joi.number().required(),
  };
  return Joi.validate(chargingDetail, schema);
}

const Charger = mongoose.model("Charger", chargerSchema);
module.exports = { chargerSchemaValidator, chargerSchema, Charger };
