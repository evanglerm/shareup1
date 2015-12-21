Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('contacts', {path: '/contacts'});
  this.route('contacts.show', {path: '/contacts/:_id'});

  //Shareup
  this.route('registers', {path: '/'});
    this.route('_registersNew', {path: '/newregister'});
    this.route('registers.show', {path: '/register/:_id'});
    this.route('records.edit', {path: '/editRecord/:_id'});

    this.route('listcontacts', {path: '/listcontacts'});
        this.route('autosuggest', {path: '/autosuggest'});
});
