Meteor.methods({
  demoSubmission: function () {
    console.log("demoSubmission method called with arguments", arguments[0]._id);
    // Check if Record Alredy Exists. First it has to have _id and that record should exist in Data collection.
    if(arguments[0]._id == null )
    {
      console.log("Inside INSERT %j"+arguments[0]);
      arguments[0].updatedAt = Date.now();
      arguments[0].updatedBy = Meteor.userId();
      arguments[0].createdAt = Date.now();
      arguments[0].createdBy = Meteor.userId();
      arguments[0].owner = Meteor.user().username ;
      Data.insert(arguments[0]);
    }else{

      //Data.update(arguments[0]);
      if(  Data.find({_id: arguments[0]._id}).count()==1)
          {
          arguments[0].updatedAt = Date.now();
          arguments[0].updatedBy = Meteor.userId();
          arguments[0].changedby = Meteor.user().username ;
          modProps = {};
          modProps = arguments[0];
          console.log(arguments[0]);
          //delete modProps._id;
          console.log("Inside Update %j"+arguments[0]);
          console.log(arguments[0]);
          //Data.update(arguments[0]);
          Data.update({_id : arguments[0]._id},{$set:modProps});
        }
      //
    };
  }
});
