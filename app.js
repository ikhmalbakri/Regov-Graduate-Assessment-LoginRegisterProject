const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "vdvdv[wvsngf987}6gf[n6h4f(g3r98v]h{74y7yw90sngfnfg7sy878gtfs9gf78ysy7y78sys7yg78s0yg78sys7h7f8h";

const mongoUrl =
  "mongodb+srv://ikhmal:ikhmal770@cluster0.50pjwb0.mongodb.net/?retryWrites=true&w=majority";

//connect Node js api with Mongodb
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

//for server
app.listen(5000, () => {
  console.log("Server Started");
});

//import schema
require("./userDetails");

// //access the model (UserInfo in userDetails)
const User = mongoose.model("UserInfo");

//register function api
app.post("/register", async (req, res) => {
  const { fname, gender, country, phone, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const olduser = await User.findOne({ email });

    if (olduser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      gender, 
      country,
      phone,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//login function api
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

//userdetail function api
app.post("/userData", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

