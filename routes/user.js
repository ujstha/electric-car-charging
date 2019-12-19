const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { validateUser, User } = require("../model/user");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  //playground();
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).send("User Not Found");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(409).send("Username already registered");
  }

  const payloadForDataBase = _.pick(req.body, [
    "firstname",
    "lastname",
    "username",
    "password",
  ]);
  user = new User(payloadForDataBase);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  const payload = _.pick(user, ["id", "username"]);
  payload.token = token;
  res
    .status(201)
    // .header("x-auth-token", token)
    .send(payload);
});

// router.put("/", auth, async (req, res) => {
//   const { error } = passWordValidator(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ username: req.user.username });
//   if (!user) return res.status(404).send("user not found");

//   const validPassword = await bcrypt.compare(
//     req.body.oldPassword,
//     user.password
//   );
//   if (!validPassword) return res.status(400).send("incorrect password");
//   const salt = await bcrypt.genSalt(10);
//   newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);

//   user.password = newHashedPassword;
//   await user.save();
//   res.status(200).send("password changed");
// });

module.exports = router;
