'use strict';

/**
 * @ngdoc function
 * @name stackDogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stackDogApp
 */
angular.module('stackDogApp')
  .controller('WatchlistCtrl', function ($scope, $modal, $routeParams, WatchlistService, CompanyService) {
      //初始化
      $scope.companies = CompanyService.query();
      $scope.watchlist = WatchlistService.query($routeParams.listId);
      $scope.stocks = $scope.watchlist.stocks;
      $scope.selectedCompany = 'Apple';
      $scope.newStock = {};
      var addStockModal = $modal({
        scope: $scope,
        template:'views/templates/addStock-modal.html',
        show:false
      });

      //通过$scope将showStockModal公开给视图
      $scope.showStockModal = function() {
        addStockModal.$promise.then(addStockModal.show);
      };

      //调用WatchListModel addStock()函数并隐藏模态框
      $scope.addStock = function() {
        $scope.watchlist.addStock({
          listId:$routeParams.listId,
          company:$scope.newStock.company,
          shares:$scope.newStock.shares,
        });
        addStockModal.hide();
        $scope.newStock = {};
      };
  });
