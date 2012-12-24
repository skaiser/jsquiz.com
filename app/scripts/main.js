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
        window.QuizApp = new window.Quiz()
        window.QuizApp.init(window.QuizApp);
    });
});