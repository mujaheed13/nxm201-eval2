const mongoose = require("mongoose");

const logoutSchema = mongoose.Schema({
   token: String
})

const LogoutModel = mongoose.model("blacklistedtoken", logoutSchema);

module.exports = { LogoutModel }