using DesafioBenner.Context;
using DesafioBenner.WebApi.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace DesafioBenner.WebApi.Api
{
    public class LoginController : ApiController
    {
        private readonly string secretKey = "sua_chave_secreta_aqui";
        private readonly DesafioContext db = new DesafioContext();

        // POST api/login
        public IHttpActionResult Post([FromBody] LoginModel model)
        {
            var usuario = db.Usuarios.FirstOrDefault(q => q.Username == model.Username);

            if (usuario != null)
            {
                var senha = "";

                using (SHA1 sha1 = SHA1.Create())
                {
                    byte[] inputBytes = Encoding.UTF8.GetBytes(usuario.Password);
                    byte[] hashBytes = sha1.ComputeHash(inputBytes);

                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hashBytes.Length; i++)
                    {
                        sb.Append(hashBytes[i].ToString("x2"));
                    }

                    senha = sb.ToString();
                }

                if (model.Password == senha)
                {
                    // Gere o token JWT
                    var token = GenerateJwtToken(model.Username);

                    return Ok(new { Token = token });
                }
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
