const mongoose= require("mongoose");

const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      profilePic: [{ type: String, required: false }],
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  const User= mongoose.model("user", userSchema)
  
  module.exports = User