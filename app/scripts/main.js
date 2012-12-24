require.config({
    shim: {
    },

    paths: {
        jquery: 'vendor/jquery.min'
    }
});
 
require(['app'], function(app) {
  // use app here
    $(document).ready(function () {
        new window.Quiz().init();
    });
});