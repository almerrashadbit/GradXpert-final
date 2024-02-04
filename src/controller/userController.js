// controllers/MovieController.js
const Model = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { nama, username, email, password, role, address, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await Model.User.create({
          nama,
          username,
          email,
          password: hashedPassword,
          role,
          address,
          phoneNumber,
        });
    
        res.json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
    
        const user = await Model.User.findOne({
          where: { username },
        });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id: user.id, username: user.username }, "verSecretKey");
        res.json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {
    registerUser,
    loginUser
};
