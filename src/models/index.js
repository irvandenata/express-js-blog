const mongoose = require('mongoose');
const {urlDB} = require('../configs');
mongoose.connect(
  urlDB,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const Tag = require('./tag');
const Article = require('./article');
const Category = require('./category');
const User = require('./user');
const db = mongoose.connection;
module.exports = {
  db,
  Tag,
  Category,
  Article,
  User
};