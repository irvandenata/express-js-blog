const {responseFormatter} = require('../helpers');
const {Category} = require('../models');
module.exports = {
  index: async (req,res) =>
  {
    try
    {
      const categories = await Category.find();
      return res.json(responseFormatter.success({message: "success",data: categories}));
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
      const category = await Category.create({name: name,slug: name});
      return res.json(responseFormatter.success({message: "success",data: category}));
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
      const category = await Category.findOne({slug: slug});
      if(!category)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success",data: category}));
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
      await Category.findOneAndUpdate({slug: slug},{name: name});
      const category = await Category.findOne({slug: slug});
      if(!category)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }

      return res.json(responseFormatter.success({message: "success",data: category}));
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
      const category = await Category.findOneAndDelete({slug: slug});
      if(!category)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success deleted",data: category}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  }
}