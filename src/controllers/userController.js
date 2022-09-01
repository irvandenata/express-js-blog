const {responseFormatter} = require('../helpers');
const {User} = require('../models');
const bcrypt = require('bcryptjs');
module.exports = {
  index: async (req,res) =>
  {
    try
    {
      const users = await User.find();
      return res.json(responseFormatter.success({message: "success",data: users}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  create: async (req,res) =>
  {
    try
    {
      const {name,email,password,role} = req.body;
      const user = await User.create({name: name,email: email,password: password,role: role});
      return res.json(responseFormatter.success({message: "success",data: user}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  show: async (req,res) =>
  {
    try
    {
      const {username} = req.params;
      const user = await User.findOne({username: username});
      if(!user)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success",data: user}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  update: async (req,res) =>
  {
    try
    {
      const {username} = req.params;
      const {name,old_password,password,role} = req.body;
      const user = await User.findOne({username: username});
      if(!user)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      const isMatch = await bcrypt.compare(old_password,user.password);
      if(isMatch)
      {
        await User.findOneAndUpdate({username: username},{name: name,password: password,role: role});
        const userUpdate = await User.findOne({username: username});
        return res.json(responseFormatter.success({message: "success",data: userUpdate}));
      } else
      {
        console.log("password not match");
        return res.json(responseFormatter.error({code: 500,message: "password not match"}));
      }
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  destroy: async (req,res) =>
  {
    try
    {
      const {username} = req.params;
      const user = await User.findOneAndDelete({username: username});
      if(!user)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success deleted",data: user}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  }
}