// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db');
const movieRoutes = require('./src/routes/movieRoutes');
const userRoutes = require('./src/routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', movieRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
