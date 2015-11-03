Meteor.publish('contacts', function() {
  return Contacts.find();
});

Meteor.publish('contact', function(_id) {
  return Contacts.find({_id: _id});
});


Meteor.publish('registers', function() {
  return Registers.find();
});

Meteor.publish('register', function(_id) {
  return Registers.find({_id: _id});
});

  Registers.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
 // TODO: Tairman need to
 // 1. Read registers collections.
 // 2. Make them "Registers.allow({" as above.
 // 3. Also Publish them like "Meteor.publish('registerS'" and
 // 4. Meteor.publish('register',
