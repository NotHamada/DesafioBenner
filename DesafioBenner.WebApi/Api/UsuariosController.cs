using DesafioBenner.Context;
using DesafioBenner.Domain.Usuarios;
using System;
using System.Linq;
using System.Web.Http;

namespace DesafioBenner.WebApi.Api
{
    public class UsuariosController : ApiController
    {
        private readonly DesafioContext db = new DesafioContext();

        
            // GET api/values/5
            [HttpGet, Route("{id:int}")]
            public IHttpActionResult Get(int id)
            {
                var usuario = db.Usuarios.FirstOrDefault(u => u.Id == id);
                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }

            // POST api/values
            [HttpPost]
            public IHttpActionResult Post([FromBody] Usuario usuario)
            {
                if (usuario == null)
                {
                    return BadRequest("Usuario não pode ser nulo.");
                }

                // Verificar se o username já existe
                if (db.Usuarios.Any(u => u.Username == usuario.Username))
                {
                    return BadRequest("Username já existe.");
                }

                // Atribuir um novo ID ao usuário
                usuario.Id = db.Usuarios.Count() + 1;

                // Criptografar a senha em SHA1 (256bits)
                using (var sha1_256bits = System.Security.Cryptography.SHA1.Create())
                {
                    var hashedBytes = sha1_256bits.ComputeHash(System.Text.Encoding.UTF8.GetBytes(usuario.Password));
                    usuario.Password = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
                }

                db.Usuarios.Add(usuario);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = usuario.Id }, usuario);
            }

            // DELETE api/values/5
            [HttpDelete, Route("{id:int}")]
            public IHttpActionResult Delete(int id)
            {
                var usuario = db.Usuarios.FirstOrDefault(u => u.Id == id);
                if (usuario == null)
                {
                    return NotFound();
                }

                db.Usuarios.Remove(usuario);
                db.SaveChanges();    

                return Ok();
            }
    }
}
