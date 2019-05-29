'use strict';

$(document).ready(function () {
    var result = $('#result');
    var r = false;
    function e(arr, k) {
        var i;
        for(i = 0; i < arr.length; i++){
            var current = arr[i];
            var filted = arr.filted(function (value, index) {
                return value !== current;
            });
            if (arr[i] <= k){
                var diff = k - arr[i];
                if (filted.indexOf(diff) !== false){
                    r = true;
                    break;
                }
            }
        }
        return r;
    }
});