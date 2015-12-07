(function () {
    "use strict";
    angular
        .module("coreServices")
        .factory("topicResource", ["$resource", "appSettings", topicResource]);

    function topicResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/KamQuiz/topics");
    }



}());


