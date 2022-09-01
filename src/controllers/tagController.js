const {responseFormatter} = require('../helpers');
const {Tag} = require('../models');
module.exports = {
  index: async (req,res) =>
  {
    try
    {
      const tags = await Tag.find();
      return res.json(responseFormatter.success({message: "success",data: tags}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  create: async (req,res) =>
  {
    try
    {
      const {name} = req.body;
      const tag = await Tag.create({name: name,slug: name});
      return res.json(responseFormatter.success({message: "success",data: tag}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  show: async (req,res) =>
  {
    try
    {
      const {slug} = req.params;
      const tag = await Tag.findOne({slug: slug});
      if(!tag)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success",data: tag}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  update: async (req,res) =>
  {
    try
    {
      const {slug} = req.params;
      const {name} = req.body;
      await Tag.findOneAndUpdate({slug: slug},{name: name});
      const tag = await Tag.findOne({slug: slug});
      if(!tag)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      console.log(tag);
      return res.json(responseFormatter.success({message: "success",data: tag}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  destroy: async (req,res) =>
  {
    try
    {
      const {slug} = req.params;
      const tag = await Tag.findOneAndDelete({slug: slug});
      if(!tag)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success deleted",data: tag}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  }
}