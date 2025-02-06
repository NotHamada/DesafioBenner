namespace DesafioBenner.Context.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrationInicial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Configuracaos",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.Int(nullable: false),
                        Power = c.Int(nullable: false),
                        Name = c.String(),
                        Symbol = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Usuarios",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Usuarios");
            DropTable("dbo.Configuracaos");
        }
    }
}
