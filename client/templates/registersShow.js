Template.registersShow.created = function () {
  this.autorun(function () {

    this.subscription = Meteor.subscribe('register', Router.current().params._id);
    this.subscription = Meteor.subscribe('data', Router.current().params._id);

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
  records : function () {
       return Data.find({"collectionId": Router.current().params._id});
     },
       newtable : function(){
         console.log("Dynamic3");
         setNewRegister(Router.current().params._id);
         setNewTab(Router.current().params._id);

         return "dynamic3"}
         ,
         selector: function () {
           return { $and: [       {"collectionId":Router.current().params._id},{ "createdBy": Meteor.userId()}     ]   };
          //return {"collectionId": Router.current().params._id}; // this could be pulled from a Session var or something that is reactive
         }

});
Template.registersShow.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();

    if (!rowData) return; // Won't be data if a placeholder row is clicked
    // Your click handler logic here
    console.log(rowData);
    Session.set("currentRecord",rowData._id);
    Router.go('records.edit', { _id : rowData._id});
  }
});
