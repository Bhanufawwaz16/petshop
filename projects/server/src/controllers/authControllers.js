const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    console.log("req body register", req.body);

    const {
      name,
      username,
      birthdate,
      gender,
      phone,
      email,
      password,
      confirmation,
      addres,
    } = req.body;

    if (
      !name ||
      !username ||
      !birthdate ||
      !gender ||
      !phone ||
      !email ||
      !password ||
      !confirmation ||
      !addres
    )
      return res.status(400).send({ message: "Tolong Isi Data Anda" });

    if (password !== confirmation)
      return res
        .status(400)
        .send({ message: "Password Tidak Sama dengan Password Konfirmasi" });

    const userExist = await db.m_users.findOne({ where: { email: email } });

    if (userExist)
      return res.status(400).send({ message: "Email Ini Sudah Tersedia" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await db.m_users.create({
      email: email,
      password: hashPassword,
      username: username,
      name: name,
      birthdate: birthdate,
      phone: phone,
      addres: addres,
      m_role_id: 1,
    });

    res.status(200).send({ message: "Succesfuly registration" });
  } catch (error) {
    console.log("Error Register", error);
    res.status(400).send(error);
  }
}

async function login(req, res) {
  try {
    console.log("req.login", req.body);

    const { username, password } = req.body;

    const user = await db.m_users.findOne({
      where: { username: username },
    });
    console.log("user", user);

    if (!user)
      return res.status(400).send({ message: "Username Belom Terdaftar" });
    console.log("username", username);

    const isvalid = await bcrypt.compare(password, user.password);

    if (!isvalid) res.status(400).send({ message: "Password Salah" });

    const payload = {
      id: user.dataValues.id,
    };
    const token = jwt.sign(payload, "bhanu", { expiresIn: "1h" });

    delete user.dataValues.password;
    const userExist = user.dataValues;
    res.status(200).send({ message: "Login Sukses", userExist, token });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

module.exports = {
  register,
  login,
};
