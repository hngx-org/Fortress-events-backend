const { User} = require('../model')



// updating a singleuser profile by id(pk)
const updateSignleUserProfile =  async(req, res) =>{
    try{
        const id  = req.params.id;
        const updateProfile = await User.findByPk(id);
        if (!updateProfile) {
          return res.status(404).json({ message: 'User not found', status: 404 });
        }        
        const { name, email,avatar } = req.body
        updateProfile.name = name;
        updateProfile.email = email;
        updateProfile.avatar = avatar;
        await updateProfile.save();
        res.status(200).json({ updateProfile });
    }catch(error){
        console.log(error);
        return res.status(404).json({ error: error.message });
    }

}

module.exports ={
    updateSignleUserProfile
}