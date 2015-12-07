(function () {
    "use strict";
    angular
        .module("quizMakerManagment")
        .controller("MainController", ["$scope","topicResource", "questionResource", "answerResource", MainController]);

    function MainController($scope,topicResource, questionResource, answerResource) {
        var vm = this;
        var activeQuestionId;
        var questionCounter = 0;
        var questionsCount;
        var questions;
        var numberOfCorrectAnswers = 0;
        vm.topics = {};
        vm.questions = {};
        vm.answer = {Id:null,Text:"",QuestionId:0,IsCorrect:false,Question:null};
        vm.nextButtonText = "Next";
        vm.showTestResult = false;
        vm.quizTopingIsLoadingText = "Quiz Topings is Loading...";
        vm.showQuestionAnswerSection = false;
        vm.selectQuiz = true;
        vm.createQuiz = ""; 
        vm.createQuizMessage = "";
        vm.test = "";
        vm.correctAnswer = "";
        vm.showAddQuizArea = false;
        vm.showDeleteQuizArea = false;
        vm.addQuestionsArea = false;
        vm.question = {};
        vm.answer1 = {};
        vm.answer2 = {};
        vm.answer3 = {};
        vm.answer4 = {};
        vm.tt = {Id:null,Name:""};
      
       
        //create and save quiz
        vm.createQuiz = function () {
            vm.createQuizMessage = "";
            
            topicResource.save(vm.topic).$promise.then(
                function (value) {
                    vm.createQuizMessage = value.Name + "is successfully created";
                   
                    setTimeout(function () { vm.createQuizMessage = "";}, 2000);
                },
                function (error) { var h = 8;}

                );
            vm.topic = "";
        };

        //save question and answers for selected quiz
        vm.saveQuestionButtonClicked = function () {
            for (var i = 0; i < vm.topics.length; i++) {
                if(vm.topics[i].Name == vm.topic.Name)
                {
                    vm.question.Id = 0;
                    vm.question.TopicId = vm.topics[i].Id;


                }
            }
           
            questionResource.save(vm.question).$promise.then(
                function (value) {
                   
                    vm.question = value;
                    vm.question.Answers = [];

                    vm.answer = { Id: null, Text: "", QuestionId: 0, IsCorrect: false, Question: null };
                    vm.answer.Id = 0;
                    vm.answer.QuestionId = value.Id;
                    if (vm.correctAnswer == "1") { vm.answer.IsCorrect = true; }
                    vm.answer.Question = null;
                    vm.answer.Text = vm.answer1.Text;
                   
                    vm.question.Answers.push(vm.answer)

                    vm.answer = { Id: null, Text: "", QuestionId: 0, IsCorrect: false, Question: null };
                    vm.answer.Id = 0;
                    vm.answer.QuestionId = value.Id;
                    if (vm.correctAnswer == "2") { vm.answer.IsCorrect = true; }
                    vm.answer.Question = null;
                    vm.answer.Text = vm.answer2.Text;

                    vm.question.Answers.push(vm.answer)

                    vm.answer = { Id: null, Text: "", QuestionId: 0, IsCorrect: false, Question: null };
                    vm.answer.Id = 0;
                    vm.answer.QuestionId = value.Id;
                    if (vm.correctAnswer == "3") { vm.answer.IsCorrect = true; }
                    vm.answer.Question = null;
                    vm.answer.Text = vm.answer3.Text;

                    vm.question.Answers.push(vm.answer)

                    vm.answer = { Id: null, Text: "", QuestionId: 0, IsCorrect: false, Question: null };
                    vm.answer.Id = 0;
                    vm.answer.QuestionId = value.Id;
                    if (vm.correctAnswer == "4") { vm.answer.IsCorrect = true; }
                    vm.answer.Question = null;
                    vm.answer.Text = vm.answer4.Text;

                    vm.question.Answers.push(vm.answer)
                    
                    questionResource.save(vm.question).$promise.then(
                          function (value) {
                              vm.question = value;
                          });
                    }
                );
        };

        vm.startCreateQuiz = function () {
            vm.addQuestionsArea = false;
            vm.showDeleteQuizArea = false;
            vm.showAddQuizArea = true;
            
        };

        vm.addQuestions = function () {
            vm.showAddQuizArea = false;
            vm.showDeleteQuizArea = false;
            vm.addQuestionsArea = true;
            
        };

        vm.deleteQuiz = function () {
            vm.addQuestionsArea = false;
            vm.showAddQuizArea = false;
            vm.showDeleteQuizArea = true;
        };

        vm.deleteSelectedQuiz = function () {

            for (var i = 0; i < vm.topics.length; i++) {
                if (vm.topics[i].Name == vm.topic.Name) {
                    topicResource.dothis({ id: vm.topics[i].Id });
                }
            }

            
      

            //topicResource.get({ id: 2 },function (data) {

            //    for(var i=0;i<vm.topics.length;i++)
            //    {
            //        if(vm.topics[i].Name == vm.topic.Name)
            //        {
            //            topicResource.dothis({ id: vm.topics[i].Id });
            //        }
            //    }

                
                
            //});



           

            //topicResource.query(function (data) {

            //    vm.topics = data;

            //    vm.topic = vm.topics[4];
            //    //vm.topic.$delete();
            //});


            //for (var i = 0; i < vm.topics.length; i++) {
            //    if (vm.topics[i].Name == vm.topic.Name) {
                    
            //        topicResource.delete(vm.topic)


                    
            //    }
            //}
            
        };

        topicResource.query(function (data) {
            
            vm.topics = data;

            vm.topic = vm.topics[0];
            vm.topic.Name = "";
            vm.topic.Questions = null;
            vm.topic.Id = null;

            vm.quizTopingIsLoadingText = "Select a Topic To Start the Quiz!";

        });

        questionResource.query(function (data) {

            vm.questions = data;

            vm.question = vm.questions[0];

            vm.question.Id = null;
            vm.question.TopicId = null;
            vm.question.Text = "";
            vm.question.Topic = null;
            vm.question.Answers = null;
           
        });

        answerResource.query(function (data) {

            vm.answers = data;

            vm.answer = vm.answers[0];

            
        });


        vm.startTheQuiz = function (Name, Id) {
            vm.selectedTopic = Name + "  Quiz Started .. Good Luck!";
            vm.showQuestionAnswerSection = true;
            vm.selectQuiz = false;

            var selectedId = Id;

            questionResource.query({ topicId: selectedId }, function (data) {
                questions = data;
                questionsCount = questions.length;

                vm.activeQuestion = data[questionCounter];
                activeQuestionId = vm.activeQuestion.Id;


                answerResource.query({ questionId: activeQuestionId }, function (data) {

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
            vm.activeQuestion = questions[questionCounter];
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





