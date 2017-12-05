const app = angular.module("EmployeeApp", ["ngRoute"]);

angular.module("EmployeeApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        .when("/employees/list", {
            templateUrl: "app/employees/partials/list.html",
            controller: "EmployeeListCtrl"
        })
        .when('/employees/create', {
            templateUrl: 'app/employees/partials/create.html',
            controller: 'EmployeeCreateCtrl'
        })
        .when('/employees/detail/:employeeId', { // <-- Magic happens here, what comes after the color becomes a variable to use in js file
            templateUrl: 'app/employees/partials/detail.html',
            controller: 'EmployeeDetailCtrl'
        })
        .otherwise('/employees/list')
})




