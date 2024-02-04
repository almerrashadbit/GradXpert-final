// controllers/MovieController.js
const Model = require('../model/model');

async function getMovies(req, res) {
  try {
      const movies = await Model.Movie.findAll({
        include: [{ model: Model.User, attributes: ['username'] }],
      });
  
      res.json({ movies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createMovies(req, res) {
  try {
    const { movie_name } = req.body;
    const { id: user_id } = req.user;

    await Model.Movie.create({
      title: movie_name,
      user_id: user_id
    });
    res.status(201).json({ message: 'Movie created successfully'});
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });  }
}

module.exports = {
  getMovies,
  createMovies
};
