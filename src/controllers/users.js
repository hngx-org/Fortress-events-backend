const {User} = require("../model");
const { NotFoundError } = require("../errors");


// get user profile by id(pk)
const getSingleUserProfile = async (req, res) => {
    try {
      const id  = req.params.id;
      const profile = await User.findByPk(id);
  
      if (!profile) {
        throw new NotFoundError("User not found");
      }
  
      res.status(200).json({ profile });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
  };
  
   module.exports = {getSingleUserProfile};