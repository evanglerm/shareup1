Template.registersShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('register', Router.current().params._id);
  }.bind(this));
};

Template.registersShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.registersShow.helpers({
  register: function () {
    return Registers.findOne({_id: Router.current().params._id});
  },


});



Template.registersShow.events({
  'click [data-action=fake]': function (event, template) {
    event.preventDefault();
    alert('Gotcha!');
  }
});
