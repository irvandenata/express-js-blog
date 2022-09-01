const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let userScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true,'title must filled !']
  },
  username: {
    type: String,
    require: [true,'username must filled !']
  },
  email: {
    type: String,
    require: [true,'email must filled !'],
    unique: true,
  },
  password: {
    type: String,
    require: [true,'password must filled !']
  },
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Y','N'],
    default: 'Y'
  },
  premium: {
    type: Number,
    default: 5
  },
  energy: {
    type: Number,
    default: 10
  }
},{timestamps: true});

userScheme.path('email').validate(function (value)
{
  if(this.isNew || this.isModified('email'))
    return new Promise((resolve,reject) =>
    {
      mongoose.model('User',userScheme).findOne({email: value},(err,user) =>
      {
        if(err)
        {
          console.log(err);
          reject(err);
        } else if(user)
        {
          resolve(false);
        } else
        {
          console.log('email is unique');
          resolve(true);
        }
      });
    });
},'email already exist !');
userScheme.pre('save',function (next)
{
  if(this.isNew)
  {
    this.username = this.name.toLowerCase().split(' ').join('-');
    mongoose.model('user',userScheme).findOne({username: this.username},(err,user) =>
    {
      if(err)
      {
        next(err);
      } else if(user)
      {
        let rand = Math.floor(Math.random() * 1000);
        this.username = `${this.username}-${rand}`;
        next();
      } else
      {
        next();
      }
    });
  }
});
userScheme.pre('save',async function (next)
{
  this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
  next();
});

userScheme.pre('findOneAndUpdate',function (next)
{
  this._update.password = bcrypt.hashSync(this._update.password,bcrypt.genSaltSync(10));
  next();
});

module.exports = mongoose.model('User',userScheme);