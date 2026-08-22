const UserModel = require("../models/User.model");
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

      const existEmail = await UserModel.findOne({ email });
      if (existEmail) {
        return res
          .status(400)
          .json({ message: "there email is already exist" });
      }
    const user = await UserModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role === "driver" ? "driver" : "user",
    });
    await user.save();
    const userResponse =user.toObject();
    delete userResponse.password;
    return res.status(200).json({message:`vaild Register welcome to uber app`,user:userResponse})
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"there is problem in Register"})
  }
};
module.exports={Register}
