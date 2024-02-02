const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Sequelize setup
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Goblokstang03',
  database: 'movie_test',
});

// Define User model
const User = sequelize.define('User', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

// Define Movie model
const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  trailerURL: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

// Relasi antara User dan Movie
User.hasMany(Movie);
Movie.belongsTo(User);

const Bookmark = sequelize.define('Bookmark', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  // Relasi antara User dan Bookmark
  User.hasMany(Bookmark);
  Bookmark.belongsTo(User);
  
  // Relasi antara Movie dan Bookmark
  Movie.hasMany(Bookmark);
  Bookmark.belongsTo(Movie);  

app.use(bodyParser.json());

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Register user
app.post('/register', async (req, res) => {
  try {
    const { nama, username, email, password, role, address, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
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
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'secret-key');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get movies (Authorization required)
app.get('/movies', verifyToken, async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/bookmark/:movieId', verifyToken, async (req, res) => {
    try {
      const { movieId } = req.params;
      const { id: userId } = req.user;
  
      // Check if the movie with the given ID exists
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Check if the bookmark already exists
      const existingBookmark = await Bookmark.findOne({
        where: { userId, movieId },
      });
  
      if (existingBookmark) {
        return res.status(400).json({ message: 'Bookmark already exists' });
      }
  
      // Create a new bookmark
      await Bookmark.create({ userId, movieId });
  
      res.json({ message: 'Bookmark added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.get('/mybookmark', verifyToken, async (req, res) => {
    try {
      const { id: userId } = req.user;
  
      // Get user's bookmarks
      const bookmarks = await Bookmark.findAll({
        where: { userId },
        include: [{ model: Movie, attributes: ['title', 'synopsis', 'trailerURL', 'imgURL', 'rating', 'status'] }],
      });
  
      res.json({ bookmarks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
