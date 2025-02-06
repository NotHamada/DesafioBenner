using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using DesafioBenner.Web.Models;
using Microsoft.IdentityModel.Tokens;

namespace DesafioBenner.Web.Api
{
    public class AccountController : ApiController
    {
        public IHttpActionResult Login([FromBody] LoginModel model)
        {
            if (model.Username == "admin" && model.Password == "123456") 
            {
                var token = GerarToken(model.Username);
                return Ok(new { token });
            }

            return Unauthorized();
        }
        
        private string GerarToken(string username)
        {
            var chaveSecreta = "sua_chave_secreta_muito_longa_aqui_minimo_32_caracteres"; // Em produção, coloque isso no Web.config
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "Benner",
                audience: "App",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}