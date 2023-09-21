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
        const group = await Group.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
        })
        res.status(StatusCodes.OK).json({group})       
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }

}

const getSingleGroup = async(req, res)=>{
    try {
        const {groupId} = req.params
        const group = await Group.findByPk(groupId)

        if(!group){
            throw new NotFoundError('Group not found!')
        }
        res.status(StatusCodes.OK).json({group})
    } catch (error) {

        return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
}

const updateGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const group = await Group.update(
        { ...req.body },
        { where: { id: eventId } }
      
      )
      if (!group) {
        throw new NotFoundError("Group not found");
      }
  
      res.status(200).json({ group });
    } catch (error) {
      
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
  };
  
  const deleteGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const group = await Group.destroy({ where: { id: groupId } });
  
      if (!group) {
        throw new NotFoundError("Group not found");
      }
  
      res.status(200).json({ group });
    } catch (error) {
      
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
  };
  


module.exports = {createGroup, getAllGroups}