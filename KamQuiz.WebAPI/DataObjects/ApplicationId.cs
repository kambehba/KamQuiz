using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using System.Xml.Serialization;

namespace KamQuiz.WebAPI.DataObjects
{
    [Serializable()]
    [DataContract]
    public class ApplicationId
    {
        [XmlElementAttribute("quizId")]
        [DataMember]
        public int QuizId { get; set; }

        [XmlElementAttribute("questionId")]
        [DataMember]
        public int QuestionId { get; set; }

        [XmlElementAttribute("answerId")]
        [DataMember]
        public int AnswerId { get; set; }
    }
}