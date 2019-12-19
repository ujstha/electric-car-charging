const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const { chargerSchemaValidator, Charger } = require("../model/charger");
const { User } = require("../model/user");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("charger");
  res.send(user.charger);
});

router.get("/:id", auth, async (req, res) => {
  const charger = await Charger.findOne({
    user: req.user.id,
    _id: req.params.id,
  });

  res.status(200).send(charger);
});

router.post("/:userId", async (req, res) => {
  const { error } = chargerSchemaValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const payload = {
    ...req.body,
    user: req.params.userId,
  };
  charger = new Charger(payload);
  const user = await User.findById(req.params.id);
  const userCharger = user.charger;
  userCharger.push(charger.id);
  await charger.save();
  await user.save();
  res.status(201).send(charger);
});

module.exports = router;
