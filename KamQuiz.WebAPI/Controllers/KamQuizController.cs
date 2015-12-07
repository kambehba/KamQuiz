using KamQuiz.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using KamQuiz.WebAPI.DataObjects;
using System.Xml.Serialization;
using System.IO;
using KamQuiz.WebAPI.Enums;

namespace KamQuiz.WebAPI.Controllers
{
    //[EnableCorsAttribute("http://localhost:65266","*", "*")]
   
    //[EnableCorsAttribute("http://kamquiz.azurewebsites.net", "*", "*")]
    //[EnableCorsAttribute("http://localhost:54714", "*", "*")]

    [EnableCorsAttribute("http://localhost:54714","http://localhost:65266", "*", "*")]
    [RoutePrefix("api/KamQuiz")]
    public class KamQuizController : ApiController
    {
        #region private properties
        
        private KamQuizDataContext db = new KamQuizDataContext();
        private string dataSourcePath { get; set; }
        private XmlSerializer serializer { get; set; }
        private StreamReader reader { get; set; }
        private Stream writer { get; set; }

        #endregion
      
        public KamQuizController()
        {
            dataSourcePath = AppDomain.CurrentDomain.BaseDirectory + "\\App_Data\\KamQuizDataSource.xml";
            serializer = new XmlSerializer(typeof(KamQuizData));
            //reader = new StreamReader(dataSourcePath);
            //writer = new FileStream(dataSourcePath, FileMode.Open);
        }



        //[Route("topics")]
        //public IEnumerable<Topic> GetTopics()
        //{
        //    var b = db.Topics.ToList();
        //    return db.Topics.ToList();

        //}

        [Route("topics")]
        public IEnumerable<Quiz> GetQuizes()
        {
            var allQuizes = new List<Quiz>();


            //string path = "C:\\KamDev\\KamQuiz\\KamQuiz.WebAPI\\App_Data\\KamQuizDataSource.xml";
            
            //XmlSerializer serializer = new XmlSerializer(typeof(KamQuizData));

            reader = new StreamReader(dataSourcePath);
            var kamQuizData = (KamQuizData)serializer.Deserialize(reader);
            foreach (var quiz in kamQuizData.Quizes)
            {
                var q = new Quiz() { Id = quiz.Id, Text = quiz.Text };
                allQuizes.Add(q);
            }

            reader.Close();
            //Stream writer = new FileStream(path, FileMode.Open);

            //serializer.Serialize(writer, g);
            //writer.Close();


            return allQuizes;

        }

        [Route("topics/{id:int}")]
        public Topic GetTopic(int id)
        {
            var b = db.Topics.ToList().Where(x=>x.Id==id).FirstOrDefault();
            return b;
        }
       
        [Route("topics/{id:int}")]
        public IEnumerable<Topic> Delete(int id)
        {
            //Determine if Topic with the given ID exist
            var quiz = db.Topics.ToList().Where(x => x.Id == id).FirstOrDefault();
            if(quiz != null)
            {
                var allQuestions = db.Questions.ToList();

                var questionsForThisQuiz = allQuestions.Where(q => q.TopicId == quiz.Id).ToList();

                foreach(var question in questionsForThisQuiz)
                {
                    var allAnswers = db.Answers.ToList();
                    var answersForCurrentQuestion = allAnswers.Where(a => a.QuestionId == question.Id).ToList();
                    foreach(var answer in answersForCurrentQuestion)
                    {
                        db.Answers.Remove(answer);
                    }
                    db.Questions.Remove(question);
                }
                db.Topics.Remove(quiz);
                db.SaveChanges();
            }

         
            
         
            return db.Topics;
           
        }

        [Route("topicId")]
        public int GetTopicIdByName(string quizName)
        {
            var quiz = db.Topics.ToList().Where(x => x.Name.Equals(quizName)).FirstOrDefault();
            return quiz.Id;
        }

        [Route("questions")]
        public IEnumerable<Question> GetAllQuestions()
        {
            return db.Questions.ToList();
        }

        //[Route("topics")]
        //public void AddNewTopic([FromBody]Topic topic)
        //{
        //    if(topic != null)
        //    {
        //        db.Topics.Add(topic);
        //        db.SaveChanges();
        //    }
            
        //}

        [Route("topics")]
        public void AddNewTopic([FromBody]Topic topic)
        {
            var q = new Quiz() { Id = GenareteId(IdType.Quiz), Text = topic.Name };

            reader = new StreamReader(dataSourcePath);
            var kamQuizData = (KamQuizData)serializer.Deserialize(reader);
            reader.Close();

            
            kamQuizData.Quizes.Add(q);
            
            writer = new FileStream(dataSourcePath, FileMode.Open);

            serializer.Serialize(writer, kamQuizData);
            writer.Close();

        }

        [Route("questions")]
        public Question AddNewQuestion([FromBody]Question question)
        {
            var q = new Question();
            var answer = new Answer();
            if (question != null)
            {
                if (question.Answers != null)
                {
                    foreach (var a in question.Answers)
                    {
                       
                        db.Answers.Add(a);
                    }
                    question.Answers = null;
                }
              

                q = db.Questions.Add(question);
                db.SaveChanges();
                
            }
            return q;

        }

        [Route("answers")]
        public void AddNewAnswer([FromBody]Answer answer)
        {
            if (answer != null)
            {
                db.Answers.Add(answer);
                db.SaveChanges();
            }

        }

        [Route("questions/{topicId:int}")]
        public IEnumerable<Question> GetQuestionWithTopicId(int topicId)
        {
            var gh = db.Questions.Where(q => q.TopicId == topicId).ToList();
            return db.Questions.Where(q => q.TopicId == topicId).ToList();
        }

        [Route("answers/{questionId:int}")]
        public IEnumerable<Answer> GetAnswersByQuestionId(int questionId)
        {

            return db.Answers.Where(a => a.QuestionId == questionId).ToList();
        }


        #region private methods

        private int GenareteId(IdType idType)
        {
            int id = 0;

            reader = new StreamReader(dataSourcePath);
            var kamQuizData = (KamQuizData)serializer.Deserialize(reader);
            reader.Close();

            switch(idType)
            {
                case IdType.Quiz:
                    id = ++kamQuizData.ApplicationIds[0].QuizId;
                    break;

                case IdType.Question:
                    id = ++kamQuizData.ApplicationIds[0].QuestionId;
                    break;

                case IdType.Answer:
                    id = ++kamQuizData.ApplicationIds[0].AnswerId;
                    break;
            }

            
            writer = new FileStream(dataSourcePath, FileMode.Open);
           
            serializer.Serialize(writer, kamQuizData);
            writer.Close();

            return id;
        }

        #endregion


    }
}
