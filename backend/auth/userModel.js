const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

// static method to log the user in
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
};


// static method to sign up a new user 
userSchema.statics.signup = async function(email, password, firstName, lastName) {
  
  //validation
  if(!email || !password){
    throw Error('All fields must be filled')
  }

  /*if(!validator.isStrongPassword()){
    throw Error('Password not strong enough')
  }*/

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt()

  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, firstName, lastName })

  return user
}


const User = mongoose.model('user', userSchema);

module.exports = User;