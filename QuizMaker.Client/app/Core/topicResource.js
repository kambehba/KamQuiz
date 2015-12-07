(function () {
    "use strict";
    angular
        .module("coreServices")
        .factory("topicResource", ["$resource", "appSettings", topicResource]);

    //function topicResource($resource, appSettings) {
    //    return $resource(appSettings.serverPath + "api/KamQuiz/topics");
    //}

    //function topicResource($resource, appSettings) {
    //    return $resource(appSettings.serverPath + 'api/KamQuiz/topics:id', {id:'@_id'});
    //}

    function topicResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/KamQuiz/topics/:id", null,
            {
                'dothis': { method: 'DELETE', params: {id:'@id'}}

            });
    }



}());


