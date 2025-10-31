(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', '$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  // Ex: shortName 'A1', 'B12'
  service.getMenuItemByShortName = function(shortName) {
    if (!shortName || typeof shortName !== 'string') {
      return $q.when(null);
    }
    var trimmed = shortName.trim().toUpperCase();
    var cat = trimmed.replace(/[^A-Z].*$/, ''); // letters prefix
    var numMatch = trimmed.match(/(\d+)/);
    if (!cat || !numMatch) {
      return $q.when(null);
    }
    var index = parseInt(numMatch[1], 10);
    if (isNaN(index) || index < 1) {
      return $q.when(null);
    }
    var url = ApiPath + '/menu_items/' + cat + '.json';
    return $http.get(url).then(function(response) {
      var data = response.data;
      if (!data || !data.menu_items || !angular.isArray(data.menu_items)) {
        return null;
      }
      var code = trimmed;
      for (var i = 0; i < data.menu_items.length; i++) {
        if (data.menu_items[i].short_name === code) {
          return data.menu_items[i];
        }
      }
      return null;
    }).catch(function() {
      return null;
    });
  };
};

})();
