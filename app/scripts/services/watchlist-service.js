'use strict';

/**
 * @ngdoc service
 * @name stackDogApp.watchListService
 * @description
 * # watchListService
 * Service in the stackDogApp.
 */
angular.module('stackDogApp')
  .service('WatchlistService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //辅助函数增强股票
    var stockModel = {
      save: function() {
        var watchlist = findById(this.listId);
        watchlist.recalculate();
        saveModel();
      }
    };

    var watchlistModel = {
      addStock: function (stock) {
        var existingStock = _.find(this.stocks, function(s) {
          return s.company.symbol === stock.company.symbol;
        });
        if(existingStock) {
          existingStock.shares += stock.shares;
        }else {
          _.extend(stock, stockModel);
          this.stocks.push(stock);
        }
        this.recalculate();
        saveModel();
      },
      removeStock: function(stock) {
        _.remove(this.stocks, function(s) {
          return s.company.symbol === stock.company.symbol;
        });
        this.recalculate();
        saveModel();
      },
      recalculate: function() {
        var calcs = _.reduce(this.stocks, function(calcs, stock) {
          calcs.shares += stock.shares;
          calcs.marketValue += stock.marketValue;
          calcs.dayChange += stock.dayChange;
          return calcs;
        }, {shares:0, marketValue:0, dayChange:0});

        this.shares = calcs.shares;
        this.marketValue = calcs.marketValue;
        this.dayChange = calcs.dayChange;
      }
    };
    
    //保存到lcoalStorage
    var saveModel = function () {
      localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['StockDog.nextId'] = Model.nextId;
    };

    //loadsh找到制定的列表
    var findById = function(listId) {
      return _.find(Model.watchlists, function(watchlist) {
        return watchlist.id === parseInt(listId);
      });
    };

    //根据ID返回指定列表
    this.query = function (listId) {
        if(listId) {
          return findById(listId);
        }else {
          return Model.watchlists;
        }
    };

    //在监视列表模型中保存一个新的列表
    this.save = function (watchlist) {
        watchlist.id = Model.nextId++;
        watchlist.stocks = [];
        _.extend(watchlist, watchlistModel);
        Model.watchlists.push(watchlist);
        saveModel();
    };

    //从列表中移除制定列表
    this.remove = function (watchlist) {
      _.remove(Model.watchlists, function(list) {
          return list.id === watchlist.id;
      });
      saveModel();
    };
    
    //localStorage加载列表
    var loadModel = function() {
      var model = { 
        watchlists: localStorage['StockDog.watchlists']? JSON.parse(localStorage['StockDog.watchlists']): [],
        nextId: localStorage['StockDog.nextId']? parseInt(localStorage['StockDog.nextId']):0,
      };

      _.each(model.watchlists, function(watchlist) {
        _.extend(watchlist, watchlistModel);
        _.each(watchlist.stocks, function(s) {
          _.extend(s, stockModel);
        });
      });

      return model;
    };

    //初始化这个单例服务模型
    var Model = loadModel();
  });
