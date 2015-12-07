(function () {
    "use strict";
    angular
        .module("coreServices")
        .factory("questionResource", ["$resource", "appSettings", questionResource]);

    function questionResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/KamQuiz/questions/:topicId");
    }



}());


