var keystone = require('keystone');
var Types = keystone.Field.Types;

var Plank = new keystone.List('Plank');

Plank.add({
   infoGuid: {
      type: String
   }
})

Plank.defaultColumns = 'infoGuid';
Plank.register();