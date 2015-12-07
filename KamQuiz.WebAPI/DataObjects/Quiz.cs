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
    public class Quiz
    {
        [XmlElementAttribute("Id")]
        [DataMember]
        public int Id { get; set; }

        [XmlElementAttribute("Text")]
        [DataMember]
        public string Text { get; set; }
    }
}