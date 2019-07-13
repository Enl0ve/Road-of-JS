'use strict';

/**
 * @ngdoc service
 * @name stackDogApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stackDogApp.
 */
angular.module('stackDogApp')
  .service('CompanyService', function CompanyService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('companies.json');
  });
  