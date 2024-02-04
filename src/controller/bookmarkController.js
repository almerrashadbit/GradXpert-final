const Model = require('../model/model');

async function getBookmark(req, res) {
    try {
        const { id: user_id } = req.user;
    
        // Get user's bookmarks
        const bookmarks = await Model.Bookmark.findAll({
          where: { user_id },
          include: [{ model: Model.Movie, attributes: ['title', 'synopsis', 'trailer_url', 'img_url', 'rating', 'status'] }],
        });
    
        res.json({ bookmarks });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {
    getBookmark,
  };