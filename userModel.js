var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  authors: [{
    type: String,
    trim: true,
  }],
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
});
// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
