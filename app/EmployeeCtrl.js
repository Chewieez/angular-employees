const app = angular.module("EmployeeMgmt", [])

app.controller("EmployeeCtrl", function($scope, $http) {
    // array of all employees, current and fired
    $scope.employees = [
        {
            "id": 1,
            "firstName": "Erin",
            "lastName": "Orstrom",
            "employmentStart": 1512140013765,
            "employmentEnd": null
        },
        {
            "id": 2,
            "firstName": "Wayne",
            "lastName": "Hutchinson",
            "employmentStart": 1512139999102,
            "employmentEnd": null
        },
        {
            "id": 3,
            "firstName": "Sarah",
            "lastName": "Story",
            "employmentStart": 1512139999729,
            "employmentEnd": null
        },
        {
            "id": 4,
            "firstName": "Sulaiman",
            "lastName": "Allan",
            "employmentStart": 1512140294571,
            "employmentEnd": null
        },
        {
            "id": 5,
            "firstName": "Ben",
            "lastName": "Marks",
            "employmentStart": 1512200192934,
            "employmentEnd": null
        }
    ]

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
        lastEmployee = $scope.employees[$scope.employees.sort((f,s) => f.id - s.id).length - 1]

        let newEmployee = {
            "id": lastEmployee.id + 1,
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "employmentStart": Date.now(),
            "employmentEnd": null

        }
        
        $scope.employees.push(newEmployee)
    }

    $scope.postToDatabase = function (data) {
        $http.post("https://angular-employees-3423d.firebaseio.com/.json", data)
        .then(function(response) {
            console.log("db uploaded finished")
        });
    }

    $scope.getDatabase = function () {
        $http.post("https://angular-employees-3423d.firebaseio.com/.json", data)
        .then(function(response) {
            console.log("db uploaded finished")
        });
    }



    
})