'use strict';

/**
 * @ngdoc directive
 * @name stackDogApp.directive:stkWatchlistPanel
 * @description
 * @param name：string|object
 * @param directiveFactory function|array
 * # stkWatchlistPanel
 */
angular.module('stackDogApp')
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
        //初始化变量
        $scope.watchlist = {};
        $scope.currentList = $routeParams;
        
        $scope.gotoList = function (listId) {
          $location.path('watchlist/' + listId);
        };


        var addListModal = $modal({
          scope:$scope,
          template:'views/templates/addlist-modal.html',
          show:false,
        });

        //绑定服务中的模型到该作用域
        $scope.watchlists = WatchlistService.query();

        //显示addlist modal
        $scope.showModal = function () {
          addListModal.$promise.then(addListModal.show);
        };

        //根据模态框列表创建新的列表
        $scope.createList = function() {
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        //删除目标并重新定向到主页
        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        };
      }
    };
  });
