angular
.module("EmployeeApp")
.controller("EmployeeDetailCtrl",
    function ($scope, $routeParams, EmployeeFactory, $location) {
        $scope.employee = {}
        
        EmployeeFactory.single($routeParams.employeeId).then(employee => {
            $scope.employee = employee
        })

        $scope.fireEmployee = function () {
            $scope.employee.employmentEnd = Date.now()

            EmployeeFactory.fire($routeParams.employeeId, $scope.employee).then(()=>{
                $location.url("/")
            })
        }

        $scope.deleteEmployee = function () {
            EmployeeFactory.delete($routeParams.employeeId).then(()=>{
                $location.url("/")
            })
        }
    }
)
