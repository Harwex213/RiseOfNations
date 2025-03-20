using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class admin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserEntities",
                columns: new[] { "Id", "Created", "Email", "IsDeleted", "Password", "Updated", "UserRole", "Username" },
                values: new object[] { 1L, new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), null, false, "$2a$11$lMSwQjxeSha8HjlCG0APZ.46R12BlZbFyzQMZjD6gPjhPJtMdzRmS", new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc), "Admin", "Harwex" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserEntities",
                keyColumn: "Id",
                keyValue: 1L);
        }
    }
}
