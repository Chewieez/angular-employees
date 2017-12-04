angular.module("EmployeeApp").factory("EmployeeFactory", function ($http) {
    const firebaseURL = "https://angular-employees-3423d.firebaseio.com"
    return Object.create(null, {
        "list": {
            value: function () {
                return $http({
                    method: "GET",
                    url: `${firebaseURL}/employees/.json`
                }).then(response => {
                    const data = response.data

                    // Make an array of objects so we can use filters and ordering
                    return Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })
                })
            }
        },
        "single": {
            value: function (key) {
                return $http({
                    method: "GET",
                    url: `${firebaseURL}/employees/${key}/.json`
                }).then(response => {
                    return response.data
                })
            }
        },
        "add": {
            value: function (employee) {
                return $http({
                    method: "POST",
                    url: `${firebaseURL}/employees/.json`,
                    data: {
                        "firstName": employee.firstName,
                        "lastName": employee.lastName,
                        "employmentStart": Date.now(),
                        "employmentEnd": 0
                    }
                })
            }
        }
    })
})