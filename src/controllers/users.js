const { User} = require('../model')
const { NotFoundError } = require("../errors")

const updateSignleUserProfile =  async(req, res) =>{
    try{
        const id  = req.params.id;
        const updateProfile = await User.findByPk(id);
        if (!updateProfile) {
            throw new NotFoundError("User not found");
          };
        res.status(200).json({ updateProfile });
    }catch(error){
        console.log(error);
        return res.status(404).json({ error: error.message });
    }

}


module.exports ={updateSignleUserProfile}