angular.module("EmployeeApp").factory("EmployeeFactory", function ($http) {
    const firebaseURL = "https://angular-employees-3423d.firebaseio.com"
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        "list": {
            value: function () {
                return $http({
                    method: "GET",
                    url: `${firebaseURL}/employees/.json`
                }).then(response => {
                    const data = response.data

                    // Make an array of objects so we can use filters and ordering
                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })
                    return this.cache
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
        },
        "fire": {
            value: function(key, employee) {
                return $http({
                    method: "PUT",
                    url: `${firebaseURL}/employees/${key}/.json`,
                    data: employee
                })
            }
        },
        "delete": {
            value: function(key) {
                return $http({
                    method: "DELETE",
                    url: `${firebaseURL}/employees/${key}/.json`,
                })
            }
        },
        "find": {
            value: function(searchString) {
                const result = this.cache.find(emp => {
                    return emp.firstName.includes(searchString) ||
                           emp.lastName.includes(searchString)
                })
                return result
            }
        }
    })
})