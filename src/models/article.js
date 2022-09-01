const mongoose = require('mongoose');
let articleScheme = mongoose.Schema({
  title: {
    type: String,
    require: [true,'title must filled !']
  },
  slug: {
    type: String,
    require: [true,'slug must filled !']
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  body: {
    type: String,
  },
  like: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    body: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
},{timestamps: true});

articleScheme.pre('save',function (next)
{
  if(this.isNew)
  {
    this.slug = this.title.toLowerCase().split(' ').join('-');
    mongoose.model('Article',articleScheme).findOne({slug: this.slug},(err,article) =>
    {
      if(err)
      {
        next(err);
      } else if(article)
      {
        let rand = Math.floor(Math.random() * 1000);
        this.slug = `${this.slug}-${rand}`;
        next();
      } else
      {
        next();
      }
    });
  } else
  {
    next();
  }
});

module.exports = mongoose.model('Article',articleScheme);