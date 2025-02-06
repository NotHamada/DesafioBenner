using System.Web.Http;

namespace DesafioBenner.Web.Api
{
    [RoutePrefix("api/Aquecimentos")]
    public class AquecimentosController : ApiController
    {
        [HttpPost]
        [Route("Salvar")]
        public IHttpActionResult Salvar()
        {
            return Ok();
        }
    }
}