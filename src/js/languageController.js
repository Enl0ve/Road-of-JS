function languageController($scope) {
    $scope.languages = [
        {name:"English", greeting:'hello'},
        {name:'Spanish', greeting:'hola'}
    ];

    $scope.greet = function(language, username) {
        return language.greeting + username;
    };

    //ng-change问题解决
    $scope.update = function (username) {
        $scope.username = username;
    }

    $scope.username = 'john';
}