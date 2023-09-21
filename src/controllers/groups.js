const sequelize = require("sequelize");
const {Group} = require("../model");
const { NotFoundError } = require("../errors");
const {StatusCodes} = require('http-status-codes')


const createGroup = async(req,res)=>{
    try {
const group = await Group.create({...req.body})
return res.status(StatusCodes.CREATED).json({message:"Group created successfully", group});
    } catch (error) {
        console.log(error);
    }
}


const getAllGroups = async(req, res)=>{
    try {
        const group = await Group.findAll({})
        if (group.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({ error: "No groups found." });
        }
    
        res.status(StatusCodes.OK).json({group})       
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }

}
const getSingleGroup = async (req, res) => {
  try {
      const { groupID } = req.params; 
      const group = await Group.findByPk(groupID); 

      if (!group) {
          throw new NotFoundError('Group not found!');
      }

      res.status(StatusCodes.OK).json({ group });
  } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
}

const updateGroup = async (req, res, next) => {
  try {
    const { groupID } = req.params;
    const updatedGroupData = req.body;

    const [updatedRowCount] = await Group.update(updatedGroupData, {
      where: { id: groupID },
    });

    if (updatedRowCount === 0) {
      throw new Error(`No group with ID: ${groupID}`);
    }
    const updatedGroup = await Group.findByPk(groupID);

    res.status(StatusCodes.OK).json({
      status: 'Success',
      msg: 'Group updated successfully',
      updated_group: updatedGroup
    });
  } catch (error) {
    next(error);
  }
};



  
  const deleteGroup = async (req, res) => {
    try {
      const { groupID } = req.params;
      const group = await Group.destroy({ where: { id: groupID } });
  
      if (!group) {
        throw new NotFoundError("Group not found");
      }
  
      res.status(StatusCodes.OK).send({msg:'Group deleted successfully'});
    } catch (error) {
      
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
  };
  


module.exports = {createGroup, getAllGroups, getSingleGroup, updateGroup, deleteGroup}