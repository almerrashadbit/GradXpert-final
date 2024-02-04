// controllers/MovieController.js
const Model = require('../model');

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

module.exports = {
  getMovies,
};
