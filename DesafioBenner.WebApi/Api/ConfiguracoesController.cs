using DesafioBenner.Context;
using DesafioBenner.Domain.Configuracoes;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DesafioBenner.WebApi.Api
{
    public class ConfiguracoesController : ApiController
    {
        private readonly DesafioContext db = new DesafioContext();

        // GET api/configuracoes
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(db.Configuracoes);
        }

        // GET api/configuracoes/5
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var configuracao = db.Configuracoes.FirstOrDefault(c => c.Id == id);
            if (configuracao == null)
            {
                return NotFound();
            }
            return Ok(configuracao);
        }

        // POST api/configuracoes
        [HttpPost]
        public IHttpActionResult Post([FromBody] Configuracao configuracao)
        {
            if (configuracao == null)
            {
                return BadRequest("Configuração não pode ser nula.");
            }

            // Verificar se o símbolo já existe
            if (db.Configuracoes.Any(c => c.Symbol == configuracao.Symbol))
            {
                return BadRequest("Símbolo já existe.");
            }

            // Atribuir um novo ID à configuração
            configuracao.Id = db.Configuracoes.Count() + 1;
            db.Configuracoes.Add(configuracao);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = configuracao.Id }, configuracao);
        }

        // PUT api/configuracoes/5
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Put(int id, [FromBody] Configuracao configuracao)
        {
            if (configuracao == null)
            {
                return BadRequest("Configuração não pode ser nula.");
            }

            var existingConfiguracao = db.Configuracoes.FirstOrDefault(c => c.Id == id);
            if (existingConfiguracao == null)
            {
                return NotFound();
            }

            // Atualizar os valores da configuração existente
            existingConfiguracao.Time = configuracao.Time;
            existingConfiguracao.Power = configuracao.Power;
            existingConfiguracao.Name = configuracao.Name;
            existingConfiguracao.Symbol = configuracao.Symbol;

            return Ok(existingConfiguracao);
        }

        // DELETE api/configuracoes/5
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var configuracao = db.Configuracoes.FirstOrDefault(c => c.Id == id);
            if (configuracao == null)
            {
                return NotFound();
            }

            db.Configuracoes.Remove(configuracao);
            db.SaveChanges();
            return Ok();
        }
    }
}
