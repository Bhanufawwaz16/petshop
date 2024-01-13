const db = require("../models");
const bcrypt = require("bcrypt");

async function getAdmin(req, res) {
  try {
    console.log("req params", req.params);
    const userRoleId = parseInt(req.params.id);

    if (userRoleId !== 3)
      return res.status(401).send({ message: "Unauthorized " });

    const userAdmin = await db.m_users.findAndCountAll({
      attributes: ["id", "email", "username"],
      where: { m_role_id: 2 },
      include: [
        {
          model: db.m_role,
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).send({ message: "Get admin success", userAdmin });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function addAdmin(req, res) {
  try {
    console.log("req body", req.body);
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).send({ message: "please completed your data" });

    const userExist = await db.m_users.findOne({
      where: { email: email, username: username },
    });

    if (userExist)
      return res
        .status(400)
        .send({ message: "email or username already exist" });

    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(password, salt);

    await db.m_users.create({
      email: email,
      username: username,
      password: hassPass,
      m_role_id: 2,
    });

    return res.status(200).send({ message: "create admin succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  addAdmin,
  getAdmin,
};
