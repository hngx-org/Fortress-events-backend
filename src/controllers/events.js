const { Events } = require('../model');


const getAllEvents = async (req, res) =>{
    try{
        const events = await Events.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
        if(!events){
            return res.status(404).json({ message: 'Event not found', status: 404 });
        };
        res.status(200).json(events)
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

  module.exports = {
    getAllEvents,
  }