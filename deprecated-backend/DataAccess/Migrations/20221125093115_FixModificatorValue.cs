using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FixModificatorValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "ModificatorValue",
                table: "ModificatorEntities",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 4L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 5L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 6L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 7L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 8L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 9L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 10L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 11L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModificatorValue",
                table: "ModificatorEntities");

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(8537), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(8921) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9296), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9297) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9300), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9300) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 4L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9302), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9302) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 5L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9305), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9305) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 6L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9315), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9316) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 7L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9318), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9319) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 8L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9321), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9322) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 9L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9324), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9325) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 10L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9328), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9329) });

            migrationBuilder.UpdateData(
                table: "GameVariableEntities",
                keyColumn: "Id",
                keyValue: 11L,
                columns: new[] { "Created", "Updated" },
                values: new object[] { new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9331), new DateTime(2022, 11, 24, 22, 4, 6, 772, DateTimeKind.Utc).AddTicks(9332) });
        }
    }
}
