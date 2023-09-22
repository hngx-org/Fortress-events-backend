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
    location: {
      type: STRING,
    },
    creator_id: {
      type: UUID,
      references: {
        model: "User",
        key: "id",
      },
    },
    start_date: {
      type: DATE,
    },
    end_date: {
      type: DATE,
    },
    start_time: {
      type: DATE,
    },
    end_time: {
      type: DATE,
    },
  },
  {
    timestamps: false,
    tableName: "events",
    modelName: "events",
  }
);
const EventThumbnail = sequelize.define(
  "EventThumbnail",
  {
    image_id: {
      type: UUID,
      primaryKey: true,
      references: {
        model: "Image",
        key: "id",
      },
    },
    event_id: {
      type: UUID,
      primaryKey: true,
      references: {
        model: "Event",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "event_thumbnail",
    modelName: "event_thumbnail",
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
    url: {
      type: STRING,
    },
  },
  {
    timestamps: false,
    tableName: "images",
    modelName: "images",
  }
);
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
    event_id: {
      type: UUID,
      references: {
        model: "Event",
        key: "id",
      },
    },
    user_id: {
      type: UUID,
      references: {
        model: "User",
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
const CommentImage = sequelize.define(
  "CommentImage",
  {
    comment_id: {
      type: UUID,
      references: {
        model: "Comment",
        key: "id",
      },
      primaryKey: true,
    },
    image_id: {
      type: UUID,
      references: {
        model: "Image",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "comment_images",
    modelName: "comment_images",
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
const UserGroup = sequelize.define(
  "UserGroup",
  {
    user_id: {
      type: UUID,
      references: {
        model: "User",
        key: "id",
      },
    },
    group_id: {
      type: UUID,
      references: {
        model: "Group",
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
    group_id: {
      type: UUID,
      references: {
        model: "Group",
        key: "id",
      },
    },
    event_id: {
      type: UUID,
      references: {
        model: "Event",
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
const GroupImage = sequelize.define(
  "GroupImage",
  {
    group_id: {
      type: UUID,
      references: {
        model: "Group",
        key: "id",
      },
    },
    image_id: {
      type: UUID,
      references: {
        model: "Image",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "group_image",
    modelName: "group_image",
  }
);
const InterestedEvent = sequelize.define(
  "InterestedEvent",
  {
    event_id: {
      type: UUID,
      references: {
        model: "Event",
        key: "id",
      },
    },
    user_id: {
      type: UUID,
      references: {
        model: "User",
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
const Like = sequelize.define(
  "Like",
  {
    comment_id: {
      type: UUID,
      references: {
        model: "Comment",
        key: "id",
      },
    },
    user_id: {
      type: UUID,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "likes",
    modelName: "likes",
  }
);

// Define the associations here...
// User to Event relationship
User.hasMany(Event, { foreignKey: "creator_id" });
Event.belongsTo(User, { foreignKey: "creator_id" });
// Event to Comment relationship
Event.hasMany(Comment, { foreignKey: "event_id" });
Comment.belongsTo(Event, { foreignKey: "event_id" });
// User to Comment relationship
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });
// Comment to Image relationship
Comment.hasMany(CommentImage, { foreignKey: "comment_id" });
CommentImage.belongsTo(Comment, { foreignKey: "comment_id" });

// EventThumbnail to Image relationship
EventThumbnail.belongsTo(Image, { foreignKey: "image_id" });
// Group to User relationship (Many-to-Many)
Group.belongsToMany(User, { through: UserGroup, foreignKey: "group_id" });
User.belongsToMany(Group, { through: UserGroup, foreignKey: "user_id" });
// Group to Event relationship (Many-to-Many)
Group.belongsToMany(Event, { through: GroupEvent, foreignKey: "group_id" });
Event.belongsToMany(Group, { through: GroupEvent, foreignKey: "event_id" });
// Group to Image relationship
GroupImage.belongsTo(Image, { foreignKey: "image_id" });
// InterestedEvent (Many-to-Many)
User.belongsToMany(Event, { through: InterestedEvent, foreignKey: "user_id" });
Event.belongsToMany(User, { through: InterestedEvent, foreignKey: "event_id" });
// Comment to Like (Many-to-Many)
Comment.belongsToMany(User, { through: Like, foreignKey: "comment_id" });
User.belongsToMany(Comment, { through: Like, foreignKey: "user_id" });
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
  Event,
  EventThumbnail,
  Image,
  Comment,
  CommentImage,
  Group,
  UserGroup,
  GroupEvent,
  GroupImage,
  InterestedEvent,
  Like,
};
