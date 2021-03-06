Template.registers.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('registers');
this.subscription = Meteor.subscribe('data', this._id);
  }.bind(this));
};

Template.registers.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));

};

Template.registers.helpers({
  registers: function () {
    //Meteor.call('removeAllPosts');
    getcontacts();
    return Registers.find();
  }
});


Template.registers.events({
  // "click .item-icon-right": function(event, template){
  //
  //    console.log("int the Event " + this._id);
  //         console.log( this);
  //
  //    //setNewRegister(this._id);
  //    Router.go('registers.show', { _id : this._id});
  // },
  "click .delete": function(event, template){

      //this.subscription = Meteor.subscribe('data', this._id);
      Session.set("currentRegister",this._id);
      console.log("session" +Session.get("currentRegister"));
     setNewRegister(this._id);
     setNewTab(this._id);
     Router.go('registers.show', { _id : this._id});
  },
  "click .contact": function(event, template){

      //this.subscription = Meteor.subscribe('data', this._id);
      Session.set("currentRegister",this._id);
     Router.go('listcontacts');
  },
  "click .autosuggest": function(event, template){

      //this.subscription = Meteor.subscribe('data', this._id);
      Session.set("autosuggest",this._id);
     Router.go('autosuggest');
  }


});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
console.log("Ready");
