const merge = require("lodash.merge")
const dotenv = require("dotenv");
dotenv.config();

const stage = process.env.NODE_ENV
let config;

if (stage === "production") {
    config = require("./prod").default
} else if (stage === "development") {
    config = require("./dev").default
} else {
    config = null
}



module.exports = merge({
    stage
},
    config
)