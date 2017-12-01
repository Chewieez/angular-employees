const app = angular.module("EmployeeMgmt", [])

app.controller("EmployeeCtrl", function($scope, $http) {
    // array of all employees, current and fired
    $scope.employees = [ ]
    // $scope.employees = [ 
    //     {
    //         "id": 1,
    //         "firstName": "Erin",
    //         "lastName": "Orstrom",
    //         "employmentStart": 1512140013765,
    //         "employmentEnd": 0
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "Wayne",
    //         "lastName": "Hutchinson",
    //         "employmentStart": 1512139999102,
    //         "employmentEnd": 0
    //     },
    //     {
    //         "id": 3,
    //         "firstName": "Sarah",
    //         "lastName": "Story",
    //         "employmentStart": 1512139999729,
    //         "employmentEnd": 0
    //     },
    //     {
    //         "id": 4,
    //         "firstName": "Sulaiman",
    //         "lastName": "Allan",
    //         "employmentStart": 1512140294571,
    //         "employmentEnd": 0
    //     },
    //     {
    //         "id": 5,
    //         "firstName": "Ben",
    //         "lastName": "Marks",
    //         "employmentStart": 1512200192934,
    //         "employmentEnd": 0
    //     }
    // ]

    // function to handle the firing of an employee by adding a date in milliseconds to the employee object of when the fire button is clicked in the dom
    $scope.fireEmployee = function (employee) {
        // find the employee for the button clicked

        employee.employmentEnd = Date.now()

        // this method is not needed 
        // let employeeIndex = $scope.employees.indexOf(employee)

        // if (employeeIndex >= 0) {
        //     date = Date.now()
        //     $scope.employees[employeeIndex].employmentEnd = date
        //     console.log($scope.employees[employeeIndex])
        // }
    }

    $scope.createEmployee = function() {

        // get the last employee id
        // lastEmployee = $scope.employees[$scope.employees.sort((f,s) => f.id - s.id).length - 1]

        let newEmployee = {
            // "id": lastEmployee.id + 1,
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "employmentStart": Date.now(),
            "employmentEnd": 0
        }

        $http.post("https://angular-employees-3423d.firebaseio.com/employees/.json", newEmployee)
        .then(function(response) {
            console.log("db uploaded finished")
            $scope.getDatabase()

            $scope.firstName = ""
            $scope.lastName = ""
        });
    }

    $scope.postToDatabase = function (e) {
        $http.post("https://angular-employees-3423d.firebaseio.com/employees/.json", e)
        .then(function(response) {
            console.log("db uploaded finished")
        });
    }

    
    $scope.getDatabase = function () {
        $http.get("https://angular-employees-3423d.firebaseio.com/employees/.json")
        .then(function(response) {
            console.log("response:", response)
            
            $scope.employees = response.data
            
            console.log("$scope.employees: ", $scope.employees)
        })
    }
    
    
    
    $scope.getDatabase()
    
    // Put all current employees into Firebase
    // $scope.employees.forEach( e => {
    //     $scope.postToDatabase(e)
    // })
    
    
    // $scope.postToDatabase = function (data) {
    //     $http.post("https://angular-employees-3423d.firebaseio.com/.json", data)
    //     .then(function(response) {
    //         console.log("db uploaded finished")
    //     });
    // }
    
})