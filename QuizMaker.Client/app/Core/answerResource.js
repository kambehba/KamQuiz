(function () {
    "use strict";
    angular
        .module("coreServices")
        .factory("answerResource", ["$resource", "appSettings", answerResource]);

    function answerResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/KamQuiz/answers/:questionId",null,
            {
                'saveAnswers' :{method:'POST'}
            });
    }



}());


