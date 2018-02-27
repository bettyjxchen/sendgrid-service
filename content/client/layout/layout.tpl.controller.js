(function() {
    'use strict'

    angular
        .module('client.layout')
        .controller('registerController', RegisterController)

    RegisterController.$inject = ['userService']

    function RegisterController(userService) {
        var vm = this

        vm.user = {}
        vm.showFormError = false
        vm.showPasswordError = false

        vm.register = _register

        init()

        function init() {

        }

        function _register() {
            if (vm.registerForm.$valid) {
                if (vm.user.password === vm.user.password2) {
                    userService.register(vm.user)
                        .then(() => {
                            vm.showPasswordError = false
                            vm.showFormError = false
                            vm.user = {}
                            vm.registerForm.$setUntouched()
                        }) 
                }
                else {
                    vm.showPasswordError = true
                }
            }
            else {
                vm.showFormError = true
            }
        }
    }

})();