Meteor.startup(function () {
//****************** Start Shareup *******************

  if (Registers.find({}).count() === 0) {
      Registers.insert({
        config: {
          name: 'R1',
          desc: 'R1 test register'
        },
        fields: [{name: 'F1', type: 'String'},{name: 'F1', type: 'Number'}]
      });
      Registers.insert({
        config: {
          name: 'R2',
          desc: 'R1 test register'
        },
        fields: [{name: 'F2', type: 'String'},{name: 'F1', type: 'Number'}]
      });
    ;
  }
//****************** End Shareup ***********************
  if (Contacts.find({}).count() === 0) {
    _(20).times(function(n) {
      var user = Fake.user();

      Contacts.insert({
        name: {
          first: user.name,
          last: user.surname
        },
        emails: [{label: 'Work', address: user.email}],
        priority: Fake.fromArray(['High', 'Medium', 'Low']),
        location: {
          city: Fake.word(),
          state: Fake.fromArray(STATES)
        },
        details: {
          notes: Fake.paragraph(),
          active: Fake.fromArray([true, false])
        }
      });
    });
  }

});
