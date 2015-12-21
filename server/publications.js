
Meteor.publish('contacts', function() {
  return Contacts.find();
});

Meteor.publish('contact', function(_id) {
  return Contacts.find({_id: _id});
});

Meteor.publish('contactauto', function(args) {
    return Contacts.find({}, args);
});


Meteor.publish('registers', function() {
  return Registers.find();
});

Meteor.publish('register', function(_id) {
  return Registers.find({_id: _id});
});


Meteor.publish('data', function(_id) {
  return Data.find({
    $and: [
        { collectionId: _id },
        { createdBy: this.userId }
      ]
  });

});




Meteor.publish('record', function(_id) {
  return Data.find({_id: _id});
});
// For Phone contact
Meteor.publish('phonecontacts', function(_id) {
  return PhoneContacts.find({"contactname":_id});
});

Meteor.publish('phonecontact1', function(_id) {
  return PhoneContacts.find({_id: _id});
});


  Registers.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
  Data.allow({
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
