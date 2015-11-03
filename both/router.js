Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('contacts', {path: '/contacts'});
  this.route('contacts.show', {path: '/contacts/:_id'});

  //Shareup
  this.route('registers', {path: '/'});
  this.route('registers.show', {path: '/registers/:_id'});
});
