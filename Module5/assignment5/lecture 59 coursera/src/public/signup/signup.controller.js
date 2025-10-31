(function(){
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','SignupService'];
function SignupController(MenuService, SignupService){
  var signup = this;

  signup.user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    favorite: ''
  };

  signup.saved = false;
  signup.invalidFavorite = false;

  signup.submit = function(form){
    signup.saved = false;
    signup.invalidFavorite = false;
    if(form.$invalid){
      return;
    }
    var fav = signup.user.favorite;
    return MenuService.getMenuItemByShortName(fav).then(function(item){
      if(!item){
        signup.invalidFavorite = true;
      } else {
        signup.user.favoriteItem = fav.trim().toUpperCase();
        SignupService.saveUser(signup.user);
        signup.saved = true;
      }
    });
  };
}

})();
