const User = require("../models/User");

const CC = require("currency-converter-lt");

const createOrUpdateUser = async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;

  res.setHeader("Content-Type", "application/json");
  try {
    const user = await User.findOne({ userId });
    console.log(user);
    if (user) res.status(200).json(user);
    else {
      const newUser = new User({
        ...req.body,
      });
      console.log(user);
      newUser.save((err, result) => {
        console.log(err, result);
        console.log(result);
        if (err) res.status(400).json(`Error: ${err}`);
        else res.status(200).json(result);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  User.findOne({ userId: req.params.userId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(`Error: ${error}`);
    });
};

const getAllUsers = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  User.find()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(`Error: ${error}`);
    });
};

const editUser = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  User.updateOne(
    { userId: req.params.userId },
    {
      $set: req.body,
    },
    (err) => {
      if (err) res.status(400).json(`Error: ${err}`);
      else res.status(200).json("Edited a user");
    }
  );
};

// const editUser2 = async (req, res) => {
//   res.setHeader("Content-Type", "application/json");

//   User.updateOne(
//     { userId: req.params.email },
//     {
//       $set: req.body,
//     },
//     (err) => {
//       if (err) res.status(400).json(`Error: ${err}`);
//       else res.status(200).json("Edited a user");
//     }
//   );
// };

module.exports = {
  createOrUpdateUser,
  getUser,
  getAllUsers,
  editUser,
  // editUser2,
};
