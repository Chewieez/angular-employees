const app = angular.module("EmployeeMgmt", [])

app.controller("EmployeeCtrl", function($scope, $http) {
    // array of all employees, current and fired
    $scope.employees = [ ]

    const getDatabase = function () {
        $http.get("https://angular-employees-3423d.firebaseio.com/employees/.json")
        .then(function(response) {
            $scope.employees = response.data
        })
    }

    // function to handle the firing of an employee by adding a date in milliseconds to the employee object of when the fire button is clicked in the dom
    $scope.fireEmployee = function (employee, key) {
        // add an end time to the employee object
        employee.employmentEnd = Date.now()
        // store this edited object into Firebase
        $http.put(`https://angular-employees-3423d.firebaseio.com/employees/${key}/.json`, employee).then(
            getDatabase
        )
    }

    $scope.deleteEmployee = function(employee, key) {
        $http.delete(`https://angular-employees-3423d.firebaseio.com/employees/${key}.json`, employee).then(
            getDatabase()
        )
    }

    $scope.createEmployee = function() {
        let newEmployee = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "employmentStart": Date.now(),
            "employmentEnd": 0
        }

        $http.post("https://angular-employees-3423d.firebaseio.com/employees/.json", newEmployee)
        .then(getDatabase)
        
        // clear out the form
        $scope.firstName = $scope.lastName = ""
    }


    getDatabase()

    
    
    
        // $scope.postToDatabase = function (e) {
        //     $http.post("https://angular-employees-3423d.firebaseio.com/employees/.json", e)
        //     .then(function(response) {
        //         console.log("db uploaded finished")
        //     });
        // }
    
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