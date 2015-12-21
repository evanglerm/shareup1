Institutions = new Mongo.Collection("institutions");

//Moved to top  to check the Auto Suggest
Contacts = new Mongo.Collection('contacts');
STATES = [
  'AK', 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


Contacts.before.insert(function (userId, doc) {
  var gender = Random.choice(['men', 'women']);
  var num = _.random(0, 50);
  doc.avatarUrl = 'https://randomuser.me/api/portraits/thumb/' + gender + '/' + num + '.jpg';
});

Contacts.attachSchema(new SimpleSchema({
  name: {
    type: Object
  },
  'name.first': {
    type: String,
    label: 'First Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'First Name'
    },
    max: 200
  },
  'name.last': {
    type: String,
    label: 'Last Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'Last Name'
    },
    max: 200
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Email Address'
    }
  },
  'emails.$.label': {
    type: String,
    label: 'Label',
    autoform: {
      options: [
        {value: 'Work', label: 'Work'},
        {value: 'Home', label: 'Home'},
        {value: 'School', label: 'School'},
        {value: 'Other', label: 'Other'}
      ]
    }
  },
  priority: {
    type: String,
    optional: true,
    autoform: {
      options: [
        {value: 'High', label: 'High'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Low', label: 'Low'}
      ],
      type: 'select-radio'
    }
  },
  location: {
    type: Object
  },
  'location.city': {
    type: String,
    max: 200
  },
  'location.state': {
    type: String,
    autoform: {
      options: _.map(STATES, function (state) {
        return {label: state, value: state};
      })
    }
  },
  details: {
    type: Object
  },
  'details.notes': {
    type: String,
    label: 'Notes',
    optional: true,
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  'details.active': {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'toggle'
    }
  },
  avatarUrl: {
    type: String,
    optional: true
  }
}));


//************START: Shareup ************
Schemas = {};
TabularTables = {};
phonecontacts = {};
Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

Registers = new Mongo.Collection("registers");
Registers2 = new Mongo.Collection("registers2");
Data = new Mongo.Collection("data");

PhoneContacts = new Mongo.Collection("phonecontacts");
ContactGroups = new Mongo.Collection("contactgroups");
Archive = new Mongo.Collection("archive");

NewRegister = null;
NewRegisterId = null;
tableSettings={};
NewTable = null;

if (NewRegisterId == null){
  console.log("setting s Table");
TabularTables.NewTable = new Tabular.Table({
  name: "NewTable",
  collection: Data,
  columns: [
    {"data" : "S", "title" : "S111"},
    {"data" : "N", "title" : "N"}
  ]
});
}
else{
  setNewTab(NewRegisterId);
};
setNewTab = function(id){
// TODO: Not why this is getting called Twice. So to avoid duplicate call this if bloack.
      console.log("Tab**setNewTab old " + NewRegisterId + "== newid   " +id );
      if (id != null){
        NewRegisterId = id;
        tableSettings = {rowsPerPage: 5,
        showNavigation: 'auto',
        showColumnToggles: true,
        fields:[{}]};
        tabFields = [];
        tabcolumns = [];
        Registers.find({_id: id}).fetch().forEach( function(doc){
        console.log("TabSetting ONCE Only");

        doc.fields.forEach(function(field){
          tabFields.push({"key" : field.name, "lable" : field.name});
          tabcolumns.push({data : field.name, title : field.name});
        });
        tableSettings["fields"] = tabFields;
        TabularTables.NewTable = new Tabular.Table({
          name: "NewTable",
          collection: Data,
          columns: tabcolumns
        });
        // NewTable = new Tabular.Table({
        //   name: "NewTable",
        //   collection: Data,
        //   columns: tabcolumns
        // });
        //console.log(tableSettings);
    });
  }
};



setNewRegister = function(id){
// TODO: Not why this is getting called Twice. So to avoid duplicate call this if bloack.
      console.log("**NewRegisterId == id " +NewRegisterId + "  " +id );
      if ( id != null){
        NewRegisterId = id;
        Registers.find({_id: id}).fetch().forEach( function(doc){
        console.log("Schema ONCE Only");
        var simpleSchema = {};
        var autoSuggestOption = {};
//         var html = "<template name="userPill">
//     <span class="label">{{username}}</span>
// </template>
        doc.fields.forEach(function(field){
          var type = {};
          if(field.type == 'String'){
                  type["type"] = String;
                  type["autoform"] =  {
                  };

          };
          if(field.type == 'Number'){
                  type["type"] = Number;
          };
          if(field.type == 'Password'){
                  type["type"] = 'password';
          };
          if(field.type == 'Date'){
                  type["type"] = Date;
          };
          if(field.type == 'MultiSelect'){
                  type["type"] = [String];
                  var optionslist = [];

                  field.options.forEach( function(option){
                      optionslist.push({value: option, label: option});
                  });
                  type["autoform"] =  {
                    options : optionslist
                  };
          };
          // Contact Type Field
          if(field.type == 'Contact'){
          type["type"] = [String];
          type["autoform"] = {
              afFieldInput: {
                type: 'autocomplete-input',
                placeholder: 'Contacts',
                // START Setting
                settings: function() {
          return {
            position: "top",
            limit: 5,
            rules: [
              {
                token: '',
                collection: PhoneContacts,
                field: "contactname",
                template: Template.contactlisting,
                noMatchTemplate : Template.nomatch
              },
              {
                token: '!',
                collection: PhoneContacts,
                field: "contactname",
                options: '',
                matchAll: true,
                filter: { createdBy: Meteor.userId() },
                template: Template.contactlisting
              }
            ]
          };
          }
                // End Settings
              }
            }
        }
          // End Contact Type Field.
            simpleSchema[field.name] = type;
          }
        );
        simpleSchema["_id"] = {
              type: String,
              optional: true,
              autoform: {
                afFieldInput: {
                  type: "hidden"
                }
              }
          } ;
          simpleSchema["createdAt"] = {
              type: "datetime",
              optional: true,
              autoform: {
                afFieldInput: {
                  type: "hidden"
                }
              }
          } ;
          simpleSchema["createdBy"] = {
                type: String,
                optional: true,
                autoform: {
                  afFieldInput: {
                    type: "hidden"
                  }
                }
            } ;
          simpleSchema["updatedBy"] = {
                type: String,
                optional: true,
                autoform: {
                  afFieldInput: {
                    type: "hidden"
                  }
                }
            } ;
          simpleSchema["updatedAt"] = {
                type: "datetime",
                optional: true,
                autoform: {
                  afFieldInput: {
                    type: "hidden"
                  }
                }
            } ;
          simpleSchema["collectionName"] = {
                type: String,
                optional: true,
                defaultValue : doc.config.name,
                autoform: {
                  afFieldInput: {
                    type: "hidden"
                  }
                }
            } ;
          simpleSchema["collectionId"] = {
                type: String,
                optional: true,
                defaultValue : doc._id,
                autoform: {
                  afFieldInput: {
                    type: "hidden"
                  }
                }
            } ;
        NewRegister = (new SimpleSchema(simpleSchema));
        Data.attachSchema(NewRegister);
        // Setting the Tabular Register As well.
        //TabularTables.NewRegisterTab = new Tabular.Table(columns);
    });
  }
};


//This sectios will list all the default registers.

Registers.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = Meteor.userId();
});


PhoneContacts.attachSchema(new SimpleSchema({
  'phonenumber': {
    type: Number
  },
  'contactname':{
    type: String
  },
  'owner':{
    type : String
  },
  'note':{
    type: String
  },
  'createdBy':{
    type: String
  },
  'createdAt': {
    type: Date
  }

}));

ContactGroups.attachSchema(new SimpleSchema({
  'contactgroup': {
    type: String
  },
  'groupdescription':{
    type: String,
    optional: true
  },
  'contact':{
    type : String
        // End Settings
  },
  'owner':{
    type : String
  },
  'note':{
    type: String
  },
  'createdBy':{
    type: String
  },
  'createdAt' :{
    type: Date
  }
}));

Archive.attachSchema(new SimpleSchema({
  'contactgroup': {
    type: Number
  },
  'groupdescription':{
    type: String,
    optional: true
  },
  'owner':{
    type : String
  },
  'note':{
    type: String
  },
  'createdBy':{
    type: String
  },
  'createdAt' :{
    type: Date
  }
}));



Registers.attachSchema(new SimpleSchema({
  config: {
    type: Object
  },
  'config.name': {
    type: String,
    label: 'Register Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'Register Name'
      },
    },
  'config.desc': {
    type: String,
    label: 'Register Description',
    autoform: {
      'label-type': 'floating',
      placeholder: 'Register Description'
    },
    max: 200
  },
  fields: {
    type: [Object]
  },

  'fields.$.name': {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Field Name'
    }
  },
  'fields.$.type': {
    type: String,
    label: 'Label',
    autoform: {
      options: [
        {value: 'String', label: 'String'},
        {value: 'Number', label: 'Number'},
        {value: 'Date', label: 'Date'},
        {value: 'MultiSelect', label: 'MultiSelect'},
        {value: 'Contact', label: 'Contact'},
        {value: 'SingleSelect', label: 'SingleSelect'}
      ]
    }
  },
  'fields.$.options': {
    type: [String],
    optional : true
  }
}));

// ***********END: Shareup ***********

// Getting the Contacts.


getcontacts = function(){
if(Meteor.isCordova) {

  vm = {};
      var options = new ContactFindOptions();
      options.filter = "";
      options.multiple = true;
      var fields =[]
      fields = fields = ["id", "photos", "name", "phoneNumbers"];
      navigator.contacts.find(fields, onSuccess, onError, options);

  function onSuccess(contacts) {
    console.log(contacts.length + 'contacts');
    console.log(contacts);
    phonecontacts = contacts;
    for (var i = 0; i < phonecontacts.length; i ++) {
            console.log(phonecontacts[i]);

            arguments[0].phonenumber =  phonecontacts[i].displayName;
            arguments[0].contactname =  phonecontacts[i].phoneNumbers[0].value;
            console.log("Inside INSERT %j"+arguments[0]);
            arguments[0].updatedAt = Date.now();
            arguments[0].updatedBy = Meteor.userId();
            arguments[0].createdAt = Date.now();
            arguments[0].createdBy = Meteor.userId();

            PhoneContacts.insert(arguments[0]);
        //     alert("Formatted: " + phonecontacts[i].name.formatted       + "\n" +
        //         "Family Name: " + phonecontacts[i].name.familyName      + "\n" +
        //         "Given Name: "  + phonecontacts[i].name.givenName       + "\n" +
        //         "Middle Name: " + phonecontacts[i].name.middleName      + "\n" +
        //         "Suffix: "      + phonecontacts[i].name.honorificSuffix + "\n" +
        //         "Prefix: "      + phonecontacts[i].name.honorificPrefix + "\n" +
        //         "Prefix: "      + phonecontacts[i].phoneNumbers[0].type + "\n" +
        //         "Prefix: "      + phonecontacts[i].phoneNumbers[0].value);
      };
    console.log("*****Cordova*****");

  }

  function onError(contactError) {
    console.log('onError!');
    }

  }
};

// ************** Trying AutoSuggest ********
Registers2.attachSchema(new SimpleSchema({
  /* ... */

  title: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'autocomplete-input',
        placeholder: 'Title'
      }
    }
  },

  content: {
    type: String
  }
}));

//****** Cleanup the Tables.
if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {
        console.log("Removing Entries");
        Data.remove({});
        return Registers.remove({});

      }

    });

  });

};
