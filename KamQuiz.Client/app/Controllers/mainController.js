(function () {
    "use strict";
    angular
        .module("kamQuizManagment")
        .controller("MainController", ["topicResource", "questionResource", "answerResource", MainController]);

    function MainController(topicResource, questionResource, answerResource) {
        var vm = this;
        var activeQuestionId;
        var questionCounter = 0;
        var questionsCount;
        var questions;
        var numberOfCorrectAnswers = 0;
        vm.topics = {};
       
        vm.nextButtonText = "Next";
        vm.showTestResult = false;
        vm.quizTopingIsLoadingText = "Quiz Topings is Loading...";
        vm.showQuestionAnswerSection = false;
        vm.selectQuiz = true;
       
        topicResource.query(function (data) {

            vm.topics = data;
            vm.quizTopingIsLoadingText = "Select a Topic To Start the Quiz!";

        });
       
        vm.startTheQuiz = function (Name,Id) {
            vm.selectedTopic = Name + "  Quiz Started .. Good Luck!";
            vm.showQuestionAnswerSection = true;
            vm.selectQuiz = false;

            var selectedId = Id;
           
            questionResource.query({ topicId: selectedId }, function (data) {
                questions = data;
                questionsCount = questions.length;
               
                vm.activeQuestion = data[questionCounter];
                activeQuestionId = vm.activeQuestion.Id;


                answerResource.query({ questionId:activeQuestionId }, function (data) {

                    vm.activeAnswer1 = data[0];
                    vm.activeAnswer2 = data[1];
                    vm.activeAnswer3 = data[2];
                    vm.activeAnswer4 = data[3];
                    
                });
            });
        };


        vm.loadNextQuestion = function () {

            //calculate test result if test is finished
            if (vm.nextButtonText == "Finish") {
                vm.testResult = (100 * numberOfCorrectAnswers) / questionsCount;
                vm.showTestResult = true;
                return;
            }
           
            questionCounter++;
            vm.activeQuestion = questions[questionCounter-1];
            activeQuestionId = vm.activeQuestion.Id;

            answerResource.query({ questionId: activeQuestionId }, function (data) {

                vm.activeAnswer1 = data[0];
                vm.activeAnswer2 = data[1];
                vm.activeAnswer3 = data[2];
                vm.activeAnswer4 = data[3];

            });

            if (questionCounter >= questionsCount - 1) { vm.nextButtonText = "Finish"; }           
        };


        
        //check the answer 
        vm.answerButtonClicked = function (answer) {

            if (answer) { numberOfCorrectAnswers++; }
        }
    }


}());





