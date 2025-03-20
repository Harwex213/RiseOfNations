using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddRealms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameVariableEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DefaultValue = table.Column<short>(type: "smallint", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameVariableEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ModificatorEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Description = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    AffectedGameVariableId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModificatorEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModificatorEntities_GameVariableEntities_AffectedGameVariab~",
                        column: x => x.AffectedGameVariableId,
                        principalTable: "GameVariableEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RealmEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Description = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    ModificatorId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealmEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealmEntities_ModificatorEntities_ModificatorId",
                        column: x => x.ModificatorId,
                        principalTable: "ModificatorEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RealmEntities_UserEntities_UserId",
                        column: x => x.UserId,
                        principalTable: "UserEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "GameVariableEntities",
                columns: new[] { "Id", "Created", "DefaultValue", "IsDeleted", "Name", "Updated" },
                values: new object[,]
                {
                    { 1L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(8537), (short)1, false, "TileIncome", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(8921) },
                    { 2L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9296), (short)5, false, "FarmIncome", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9297) },
                    { 3L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9300), (short)12, false, "FarmCostInitial", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9300) },
                    { 4L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9302), (short)2, false, "FarmCostIncreasing", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9302) },
                    { 5L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9305), (short)4, false, "UnitMoveOnFriendTiles", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9305) },
                    { 6L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9315), (short)1, false, "UnitMoveOnEnemyTiles", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9316) },
                    { 7L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9318), (short)10, false, "UnitCostLevelOne", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9319) },
                    { 8L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9321), (short)14, false, "UnitCostLevelTwo", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9322) },
                    { 9L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9324), (short)20, false, "UnitCostLevelThree", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9325) },
                    { 10L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9328), (short)12, false, "TowerCostLevelOne", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9329) },
                    { 11L, new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9331), (short)20, false, "TowerCostLevelTwo", new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9332) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ModificatorEntities_AffectedGameVariableId",
                table: "ModificatorEntities",
                column: "AffectedGameVariableId");

            migrationBuilder.CreateIndex(
                name: "ModificatorEntityName",
                table: "ModificatorEntities",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RealmEntities_ModificatorId",
                table: "RealmEntities",
                column: "ModificatorId");

            migrationBuilder.CreateIndex(
                name: "IX_RealmEntities_UserId",
                table: "RealmEntities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "RealmEntityName",
                table: "RealmEntities",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RealmEntities");

            migrationBuilder.DropTable(
                name: "ModificatorEntities");

            migrationBuilder.DropTable(
                name: "GameVariableEntities");
        }
    }
}
