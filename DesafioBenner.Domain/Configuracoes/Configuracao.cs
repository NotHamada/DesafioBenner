using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesafioBenner.Domain.Configuracoes
{
    public class Configuracao
    {
        public int Id { get; set; }
        public int Time { get; set; }
        public int Power { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
    }
}
