using DesafioBenner.WebApi.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace DesafioBenner.WebApi.Api
{
    public class LoginController : ApiController
    {
        private readonly string secretKey = "sua_chave_secreta_aqui";

        // POST api/values
        public IHttpActionResult Post([FromBody] LoginModel model)
        {

            // Verifique as credenciais do usuário (exemplo simples)
            if (model.Username == "usuario" && model.Password == "senha")
            {
                // Gere o token JWT
                var token = GenerateJwtToken(model.Username);

                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, username)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
