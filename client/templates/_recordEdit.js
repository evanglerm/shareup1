
Template.recordsEdit.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('record',Router.current().params._id);
this.subscription = Meteor.subscribe('data');

  }.bind(this));
};


Template.recordsEdit.helpers({
  recordVar : function(){
    console.log("Dynamic3");
    return "dynamic3"},
    selectedRecordDoc: function () {
      console.log("dynamic3 id " +Router.current().params._id );
      console.log("dynamic3 record " + Data.findOne({_id: Router.current().params._id}));
      return Data.findOne({_id: Router.current().params._id})
 ;
    },
    formType: function () {
      if (Session.get("selectedPersonId")) {
        return "update";
      } else {
        return "disabled";
      }
    }
});



AutoForm.hooks({
  'registers-edit-record': {
    onSuccess: function (operation, result, template) {

      setNewRegister(Session.get("currentRegister"));
      setNewTab(Session.get("currentRegister"));
      Router.go('registers.show', { _id : Session.get("currentRegister")});

    },
    before: {
      demoSubmission: function (doc) {
        arguments['_id'] = Session.get("currentRecord");
        console.log("before method hook called with Id", Session.get("currentRecord"));
        arguments[0].updatedAt = Date.now();
        arguments[0].updatedBy = Meteor.userId();

        //console.log("before method hook context:", this);
        return doc;
      }
    },
    after: {
      demoSubmission: function () {
        console.log("after method hook called with arguments", arguments);
        //console.log("after method hook context:", this);
      }
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
  });
