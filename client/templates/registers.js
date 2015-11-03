Template.registers.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('registers');
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
    return Registers.find();
  }
});
