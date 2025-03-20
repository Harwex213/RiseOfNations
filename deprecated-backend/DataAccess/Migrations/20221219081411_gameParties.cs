using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class gameParties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GamePartyEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    WinnerUserId = table.Column<long>(type: "bigint", nullable: false),
                    TurnsCompleted = table.Column<int>(type: "integer", nullable: false),
                    TurnDuration = table.Column<short>(type: "smallint", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GamePartyEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GamePartyEntities_UserEntities_WinnerUserId",
                        column: x => x.WinnerUserId,
                        principalTable: "UserEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GamePartyEntities_WinnerUserId",
                table: "GamePartyEntities",
                column: "WinnerUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GamePartyEntities");
        }
    }
}
