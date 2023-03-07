using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class updateGameVars : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "GameVariableEntities",
                columns: new[] { "Id", "Created", "DefaultValue", "IsDeleted", "Name", "Updated" },
                values: new object[,]
                {
                    { 12L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), (short)3, false, "TowerOutcomeLevelOne", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) },
                    { 13L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), (short)6, false, "TowerOutcomeLevelTwo", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) },
                    { 14L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), (short)2, false, "UnitOutcomeLevelOne", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) },
                    { 15L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), (short)4, false, "UnitOutcomeLevelTwo", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) },
                    { 16L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), (short)7, false, "UnitOutcomeLevelThree", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 12L);

            migrationBuilder.DeleteData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 13L);

            migrationBuilder.DeleteData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 14L);

            migrationBuilder.DeleteData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 15L);

            migrationBuilder.DeleteData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 16L);
        }
    }
}
