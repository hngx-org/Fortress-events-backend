const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/sequelize.js')
const { STRING, DATE, UUID, UUIDV4 } = DataTypes


const User = sequelize.define('User', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: STRING,
        comment: 'URL to the user\'s avatar',
    },
});

const InterestedEvent = sequelize.define('InterestedEvent', {
    user_id: {
        type: UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    event_id: {
        type: UUID,
        references: {
            model: 'Events',
            key: 'id',
        },
    },
});


const UserGroup = sequelize.define('UserGroup', {
    user_id: {
        type: UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    group_id: {
        type: UUID,
        references: {
            model: 'Groups',
            key: 'id',
        },
    },
});


const GroupEvent = sequelize.define('GroupEvent', {
    event_id: {
        type: UUID,
        references: {
            model: 'Events',
            key: 'id',
        },
    },
    group_id: {
        type: UUID,
        references: {
            model: 'Groups',
            key: 'id',
        },
    },
});


const Group = sequelize.define('Group', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {
        type: STRING,
        allowNull: false,
    },
});

const Event = sequelize.define('Event', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: STRING,
    },
    creator: {
        type: UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    location: {
        type: STRING,
    },
    start_at: {
        type: DATE,
    },
    end_at: {
        type: DATE,
    },
    thumbnail: {
        type: STRING,
        comment: 'URL to the thumbnail',
    },
});


const Comment = sequelize.define('Comment', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    body: {
        type: STRING,
        comment: 'Text content of the comments',
    },
    user_id: {
        type: UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    event_id: {
        type: UUID,
        references: {
            model: 'Events',
            key: 'id',
        },
    },
});



const Image = sequelize.define('Image', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    comment_id: {
        type: UUID,
        references: {
            model: 'Comments',
            key: 'id',
        },
    },
    image_url: {
        type: STRING,
        comment: 'URL to the images',
    },
});


module.exports = {
    User,
    InterestedEvent,
    UserGroup,
    GroupEvent,
    Group,
    Event,
    Comment,
    Image
};