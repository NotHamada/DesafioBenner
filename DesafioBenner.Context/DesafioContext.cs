using DesafioBenner.Domain.Configuracoes;
using DesafioBenner.Domain.Usuarios;
using System.Data.Entity;

namespace DesafioBenner.Context
{
    public class DesafioContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Configuracao> Configuracoes { get; set; }
    }
}
