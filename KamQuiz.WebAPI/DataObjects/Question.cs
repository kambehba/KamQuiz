using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace KamQuiz.WebAPI.DataObjects
{
    [Serializable()]
    public class Question
    {
        [XmlElementAttribute("Id")]
        public int Id { get; set; }

        [XmlElementAttribute("Text")]
        public string Text { get; set; }

        [XmlElementAttribute("QuestionId")]
        public int QuizId { get; set; }
    }
}