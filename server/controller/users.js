const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .select("name email phoneNumber userImage userRole verified createdAt")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    let { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let checkUser = await userModel.findOne({ email: email });
        if (checkUser) {
          return res.json({ error: "Email already exists" });
        } else {
          let hashedPassword = bcrypt.hashSync(password, 10);
          let newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            userRole: 0,
          });
          let save = await newUser.save();
          if (save) {
            return res.json({ success: "User added successfully" });
          }
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong" });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        let currentUser = await userModel.findByIdAndUpdate(
          uId,
          {
            name: name,
            phoneNumber: phoneNumber,
            updatedAt: Date.now(),
          },
          { new: true }
        );
        if (currentUser) {
          return res.json({ success: "User updated successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        let deletedUser = await userModel.findByIdAndDelete(uId);
        if (deletedUser) {
          return res.json({ success: "User deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All fields must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          let hashedPassword = bcrypt.hashSync(newPassword, 10);
          await userModel.findByIdAndUpdate(uId, {
            password: hashedPassword,
          });
          return res.json({ success: "Password updated successfully" });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
}

const usersController = new User();
module.exports = usersController;