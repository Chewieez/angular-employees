const app = angular.module("EmployeeMgmt", [])

app.controller("EmployeeCtrl", function($scope, $http) {
    // empty array to hold all employees, current and fired
    $scope.employees = [ ]

    // call to firebase to get the database of employees and store it in the $scope.employees array
    const getDatabase = function () {
        $http.get("https://angular-employees-3423d.firebaseio.com/employees/.json")
        .then(function(response) {
            $scope.employees = response.data
        })
    }

    // function to handle the firing of an employee by adding a date in milliseconds to the employee object of when the fire button is clicked in the dom, then send that updated empoloyee object to the firebase database. Then call to get the updated database to keep the dom list of employees updated
    $scope.fireEmployee = function (employee, key) {
        // add an end time to the employee object
        employee.employmentEnd = Date.now()
        // store this edited object into Firebase
        $http.put(`https://angular-employees-3423d.firebaseio.com/employees/${key}/.json`, employee).then(
            getDatabase
        )
    }

    // call to firebase to delete the matching employee object from the database, then a call to get the updated database to keep the dom list of employees updated
    $scope.deleteEmployee = function(employee, key) {
        $http.delete(`https://angular-employees-3423d.firebaseio.com/employees/${key}.json`, employee).then(
            getDatabase()
        )
    }

    // create a new employee object then send it up to firebase database and then get the updated database back so dom will be updated
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
})