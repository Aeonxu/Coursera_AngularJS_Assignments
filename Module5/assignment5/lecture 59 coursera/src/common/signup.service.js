(function(){
"use strict";

angular.module('common')
.service('SignupService', SignupService);

function SignupService(){
  var service = this;
  var user = null;

  service.saveUser = function(data){
    user = angular.copy(data);
  };

  service.getUser = function(){
    return user;
  };
}

})();
