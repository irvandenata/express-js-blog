const mongoose = require('mongoose');
let categoryScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true,'category name must filled !']
  },
  slug: {
    type: String,
    require: [true,'category slug must filled !']
  },
},{timestamps: true});

categoryScheme.pre('save',function (next)
{
  if(this.isNew)
  {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    mongoose.model('category',categoryScheme).findOne({slug: this.slug},(err,category) =>
    {
      if(err)
      {
        next(err);
      } else if(category)
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

module.exports = mongoose.model('Category',categoryScheme);