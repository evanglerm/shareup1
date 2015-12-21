if (Meteor.isClient) {

    Template.registrationStart.helpers({
    settings: function() {
        return {
            position: "top",
            limit: 7,
            rules: [{
                collection: Contacts,
                field: "name.first",
                options: '',
                matchAll: true,
                template: Template.institutionSelectDisplay
            }]
        };
    },

    institutions: function() {
        return Instititions.find();
    }
    });
    Meteor.subscribe('institutions');
    Template.registrationStart.events({
    "autocompleteselect input": function(event, template, doc) {
        // Session.set(event.target.name, event.target.value);
        console.log("selected: ", doc);
        console.log("event.target.name: ", event.target.name);
        console.log("event.target.value: ", event.target.value);
    }
    });

}

if (Meteor.isClient) {
  Session.setDefault('img', null);

  var getPicture = function(opts) {
    MeteorCamera.getPicture(opts, function(err, data) {
      if (err) {
        console.log('error', err);
      }
      if (data) {
        Session.set('img', data)
      }
    });
  };

  Template.cameraEvent.events({
    'click button': function () {
      getPicture({
        width: 350,
        height: 350,
        quality: 75
      });
    }
  });

  Template.libraryEvent.events({
    'click button': function () {
      if (Meteor.isCordova) {
        getPicture({
          width: 350,
          height: 350,
          quality: 75,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
      } else {
        alert('Cordova only feature.');
      }
    }
  });

  Template.img.helpers({
    img: function() {
      return Session.get('img');
    }
  });
}
