angular
.module("EmployeeApp")
.controller("EmployeeDetailCtrl",
    function ($scope, $routeParams, EmployeeFactory) {
        $scope.employee = {}
        
        EmployeeFactory.single($routeParams.employeeId).then(employee => {
            $scope.employee = employee
        })

        
    }
)
