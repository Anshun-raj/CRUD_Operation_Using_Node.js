const mongoose = require("mongoose");
const express = require("express");
mongoose.set("strictQuery", false);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const User = require("./users");
const app = express();

mongoose.connect(
  "mongodb+srv://avenger:iljkBYeikb1y3z9w@cluster0.os8han0.mongodb.net/Learn?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// .then(() => {
//   console.log("db connected successfully");
// });

// User.find({}, function (err, users) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(users);
//   }
// });

const data = new User({
  _id: new mongoose.Types.ObjectId(),
  name: "Raja",
  email: "raja363@gamil.com",
  address: "Siwan",
  gender: "Male",
});

data
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/users", function (req, res) {
  User.find().then((result) => {
    res.status(201).json(result);
  });
});

app.post("/user", jsonParser, function (req, res) {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    gender: req.body.gender,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/user/:id", function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});
app.put("/user/:id", jsonParser, function (req, res) {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/search/:name", function (req, res) {
  const regex = new RegExp({ _id: req.params.id }, "i");
  User.find({ name: regex })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(5000);
