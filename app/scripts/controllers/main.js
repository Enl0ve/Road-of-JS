'use strict';

/**
 * @ngdoc function
 * @name stackDogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stackDogApp
 */
angular.module('stackDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
      //为动态导航链接添加监视列表
      $scope.watchlists = WatchlistService.query();

      //将$location.path()函数用作$watch表达式
      /**
       * $scope.$watch(expression, listener, objectEquality[options])函数
       * @param expression:function|string
       * @param listener：function(newVal, oldVal, scope)
       * @description $watch()函数将监视第一个参数的返回值,并且每次改动时调用第二个参数传入的回调函数
       */
      $scope.$watch(function(){
        return $location.path();
      }, function(path) {
        if(_.includes(path, 'watchlist')) {
          $scope.activeView = 'watchlist';
        }else{
          $scope.activeView = 'dashboard';
        }
      });
  });
