const { DataTypes } = require("sequelize");

const { sequelize } = require("../config/dbConfig");

const { STRING, DATE, UUID, UUIDV4 } = DataTypes;

const User = sequelize.define(
  "User",
  {
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
    },
  },

  {
    timestamps: false,
    tableName: "users",
    modelName: "users",
  }
);

const InterestedEvent = sequelize.define(
  "InterestedEvent",
  {
    user_id: {
      type: UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "interested_events",
    modelName: "interested_events",
  }
);

const UserGroup = sequelize.define(
  "UserGroup",
  {
    user_id: {
      type: UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
    group_id: {
      type: UUID,
      references: {
        model: "Groups",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "user_groups",
    modelName: "user_groups",
  }
);

const GroupEvent = sequelize.define(
  "GroupEvent",
  {
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
    group_id: {
      type: UUID,
      references: {
        model: "Groups",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "group_events",
    modelName: "group_events",
  }
);

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "groups",
    modelName: "groups",
  }
);

const Event = sequelize.define(
  "Event",
  {
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
        model: "Users",
        key: "id",
      },
    },
    location: {
      type: STRING,
    },
    start_date: {
      type: DATE,
    },
    start_time: {
      type: DATE,
    },
    end_date: {
      type: DATE,
    },
    end_time: {
      type: DATE,
    },
    thumbnail: {
      type: STRING,
      comment: "URL to the thumbnail",
    },
}, {
    tableName: 'events',
    modelName: 'events'
});


const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    body: {
      type: STRING,
    },
    user_id: {
      type: UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "comments",
    modelName: "comments",
  }
);

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    comment_id: {
      type: UUID,
    },
    image_url: {
      type: STRING,
    },
  },
  {
    timestamps: false,
    tableName: "images",
    modelName: "images",
  }
);

User.belongsToMany(Event, { through: InterestedEvent });
Event.belongsToMany(User, { through: InterestedEvent });

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

Group.belongsToMany(Event, { through: GroupEvent });
Event.belongsToMany(Group, { through: GroupEvent });

Event.belongsTo(User, { foreignKey: "creator" });

User.hasMany(Comment, { foreignKey: "user_id" });
Event.hasMany(Comment, { foreignKey: "event_id" });
Comment.hasMany(Image, { foreignKey: "comment_id" });

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Database synchronization error:", error);
  });

module.exports = {
  User,
  InterestedEvent,
  UserGroup,
  GroupEvent,
  Group,
  Event,
  Comment,
  Image,
};
