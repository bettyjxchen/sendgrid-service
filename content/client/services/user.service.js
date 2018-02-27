/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('userService', UserServiceFactory)

   UserServiceFactory.$inject = ['$http', '$q']

    function UserServiceFactory($http, $q) {
        return {
            readAll: _readAll,
            readById: _readById,
            register: _register,
        }

        function _readAll() {
            return $http.get('/api/users')
                .then(xhrSuccess)
                .catch(onError)
        }

        function _readById(id) {
            return $http.get(`/api/users/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _register(data) {
            return $http.post('/api/users/register', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()
