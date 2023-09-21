const { User, Event } = require('../model/index');

// helper functions
const { handleAsync, createApiError, handleResponse } = require('../utils/helpers/helper');

// cloudinary
const cloudUpload = require('../utils/constants/cloudinary');


const createEvent = handleAsync(async (req, res) => {
    const { title, description, location, start_at, end_at } = req.body;
    // validating the request from the front-end
    if (!title || !description || !location || !start_at || !end_at) {
        throw createApiError('One or more required fields are missing.', 404);
    };
    // get user from the auth middleware
    const user = req.user;
    const userId = user.id;
    // find user
    const userExist = await User.findOne({
        where: {
            id: userId
        }
    });
    // throw an error if user does not exist
    if (!userExist) {
        throw createApiError('User not found', 404);
    }
    // Getting the buffer from the req
    const buffer = req.file.buffer;
    // get the thumbnail url from cloudinary
    const thubUrl = cloudUpload(buffer);

    try {
        // create a new event
        eventData = await Event.create({
            title,
            description,
            location,
            start_at,
            end_at,
            thumbnail: thubUrl.toString(),
        });
        return res.status(200).json(handleResponse({
            message: 'event created successfully', data: { ...eventData }, success: true,
        }))
    } catch (err) {
        return createApiError('Error creating new event', 401);
    }
});


module.exports = {
    createEvent
}