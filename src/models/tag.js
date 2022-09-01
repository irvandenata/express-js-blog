const mongoose = require('mongoose');

let tagScheme = mongoose.Schema({
  name: {
    type: String,

    require: [true,'Tag name must filled !']
  },
  slug: {
    type: String,
    require: [true,'Tag slug must filled !']
  },
},{timestamps: true});

tagScheme.pre('save',function (next)
{
  if(this.isNew)
  {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    mongoose.model('Tag',tagScheme).findOne({slug: this.slug},(err,tag) =>
    {
      if(err)
      {
        next(err);
      } else if(tag)
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

module.exports = mongoose.model('Tag',tagScheme);