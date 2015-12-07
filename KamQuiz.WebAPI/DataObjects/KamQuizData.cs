using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using System.Xml.Serialization;

namespace KamQuiz.WebAPI.DataObjects
{
    [Serializable()]
    [XmlRoot("KamQuizData")]
    public class KamQuizData
    {
        public KamQuizData()
        {
            Quizes = new List<Quiz>();
            Questions = new List<Question>();
            ApplicationIds = new List<ApplicationId>();
            Answers = new List<Answer>();


        }
        [XmlArray("Questions")]
        [XmlArrayItem("Question", typeof(Question))]
        public List<Question> Questions { get; set; }

        [XmlArray("Answers")]
        [XmlArrayItem("Answer", typeof(Answer))]
        public List<Answer> Answers { get; set; }

        [XmlArray("Quizes")]
        [XmlArrayItem("Quiz", typeof(Quiz))]
        public List<Quiz> Quizes { get; set; }

        [XmlArray("ApplicationIds")]
        [XmlArrayItem("ApplicationId", typeof(ApplicationId))]
        public List<ApplicationId> ApplicationIds { get; set; }
    }
}