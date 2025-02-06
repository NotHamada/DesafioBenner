using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesafioBenner.WebApi.Models
{
    public class ConfiguracaoModel
    {
        public int? Id { get; set; }
        public int Time { get; set; }
        public int Power { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
    }
}