angular.module("EmployeeApp").controller("EmployeeListCtrl", function ($scope, EmployeeFactory) {
    console.log("ran again")
    $scope.employees = []

    EmployeeFactory.list().then(data => {
        $scope.employees = data
    })
})