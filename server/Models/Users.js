const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
      // match: [
      //   /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))[A-Za-z0-9]+@((\w+\-+)|(\w+\.))\w{1,63}\.[a-zA-Z]{2,6}$/i,
      //   "Please Enter a valid email",
      // ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the passsword"],
    },
    photo: {
      type: String,
      // required:[true,"Please Enter a Photo"],
      default: "",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio too large!! Not more than 250 characters"],
      default: "",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Reference to Post model
  },
  {
    timestamps: true,
  }
);

// whenever we are registering / updaiting pr any
//interaction with  password the pre middleware is being fired

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(this.password, salt);
//   this.password = hashedPassword;
//   next();
// });

module.exports = mongoose.model("user", UserSchema);
