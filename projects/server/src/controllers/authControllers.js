const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const moment = require("moment");
const m_token = require("../models/m_token");
const { Op } = require("sequelize");

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
      location,
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
      !addres ||
      !location
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
      location: location,
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

      include: { model: db.m_role },
    });
    console.log("user", user);

    if (!user)
      return res.status(400).send({ message: "Username Belom Terdaftar" });
    console.log("username", username);

    const isvalid = await bcrypt.compare(password, user.password);

    if (!isvalid) res.status(400).send({ message: "Password Salah" });

    const generateToken = nanoid();

    const tokenexits = await db.m_token.findOne({
      where: { m_user_id: user.dataValues.id, valid: true },
    });

    console.log("token exist", tokenexits);

    await db.m_token.update(
      {
        valid: false,
      },
      {
        where: { m_user_id: user.dataValues.id },
      }
    );

    const token = await db.m_token.create({
      m_user_id: user.dataValues.id,
      token: generateToken,
      expired: moment().add(1, "days"),
      valid: true,
      status: "LOGIN",
    });

    delete user.dataValues.password;
    const userExist = user.dataValues;
    return res.status(200).send({ message: "Login Sukses", userExist, token });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function getUserByToken(req, res) {
  try {
    console.log("req params", req.params);
    const { token } = req.params;
    console.log("token user", token);

    const userToken = await db.m_token.findOne({
      where: {
        token: token,
        valid: true,
        expired: { [Op.gt]: moment() },
      },
    });

    const findUser = await db.m_users.findOne({
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
      where: { id: userToken.dataValues.m_user_id },
      include: [
        {
          model: db.m_role,
          attributes: ["id", "name"],
        },
      ],
    });

    delete findUser.dataValues.password;
    // console.log("findUser", findUser);

    return res
      .status(200)
      .send({ message: "succesfully get user by token", user: findUser });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  register,
  login,
  getUserByToken,
};
