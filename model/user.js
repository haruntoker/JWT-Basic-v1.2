const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};


userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new CustomAPIError('Invalid credentials', 400);
  }

  

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
