



Template._recordNew.helpers({
  registerVar : function(){
    console.log("Dynamic2");

    return "dynamic2"}
});




AutoForm.hooks({
  'registers-new-record': {
    onSuccess: function (operation, result, template) {

      IonModal.close();
      setNewRegister(Session.get("currentRegister"));
      setNewTab(Session.get("currentRegister"));
    },
    before: {
      demoSubmission: function (doc) {
        arguments[0].updatedAt = Date.now();
        arguments[0].updatedBy = Meteor.userId();
        console.log("before method hook called with arguments", arguments);
        //console.log("before method hook context:", this);
        return doc;
      }
    },
    after: {
      demoSubmission: function () {
        console.log("after method hook called with arguments", arguments);
        console.log("session" +Session.get("currentRegister"));


        //console.log("after method hook context:", this);
      }
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
  });
