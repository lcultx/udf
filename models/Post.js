var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
   map: { name: 'title' },
   autokey: { path: 'slug', from: 'title', unique: true },
});
var UploadFile = {
      type: Types.LocalFile, 
      dest: 'public/data/files',
      prefix: '/files/',
      format: function (item, file) {
         return '<img src="data/files/' + file.filename + '" style="max-width: 300px">'
      }
   }
Post.add({
   title: { type: String, required: true },
   state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
   author: { type: Types.Relationship, ref: 'Y', index: true },
   publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
   image: UploadFile,
   content: {
      brief: { type: Types.Html, wysiwyg: true, height: 150 },
      extended: { type: Types.Html, wysiwyg: true, height: 400 }
   },
   顶视图:UploadFile ,
   categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
   return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
