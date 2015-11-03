AutoForm.hooks({
  'registers-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      Router.go('registers.show', {_id: result});
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
