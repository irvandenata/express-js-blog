const {responseFormatter} = require('../helpers');
const {Category,Article} = require('../models');
module.exports = {
  index: async (req,res) =>
  {
    try
    {
      const articles = await Article.find().populate('category').populate('tags');
      return res.json(responseFormatter.success({message: "success",data: articles}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  },
  create: async (req,res) =>
  {
    try
    {
      const {title,body,author,tags,category} = req.body;
      const article = await Article.create({title: title,body: body,author: author,tags: tags,category: category,slug: title});
      return res.json(responseFormatter.success({message: "success",data: article}));
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
      const article = await Article.findOne({slug: slug}).populate('category').populate('tags');
      if(!article)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success",data: article}));
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
      const {title,body,author,tags,category} = req.body;
      await Article.findOneAndUpdate({slug: slug},{title: title,body: body,author: author,tags: tags,category: category});
      const article = await Article.findOne({slug: slug}).populate('category').populate('tags');
      if(!article)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }

      return res.json(responseFormatter.success({message: "success",data: article}));
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
      const article = await Article.findOneAndDelete({slug: slug});
      if(!article)
      {
        return res.json(responseFormatter.error({code: 404,message: "data not found"}));
      }
      return res.json(responseFormatter.success({message: "success deleted",data: article}));
    } catch(error)
    {
      return res.json(responseFormatter.error({code: 500,message: error.message}));
    }
  }
}