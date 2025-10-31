(function(){
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService','MenuService'];
function MyInfoController(SignupService, MenuService){
  var info = this;
  info.user = SignupService.getUser();
  info.item = null;
  info.imgUrl = null;

  if(info.user && info.user.favoriteItem){
    var code = info.user.favoriteItem;
    MenuService.getMenuItemByShortName(code).then(function(item){
      info.item = item;
      if(item){
        var cat = code.trim().toUpperCase().replace(/[^A-Z].*$/, '');
        info.imgUrl = 'images/menu/' + cat + '/' + code.trim().toUpperCase() + '.jpg';
      }
    });
  }
}

})();
