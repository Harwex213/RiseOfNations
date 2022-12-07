using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UserEntityUsername",
                table: "UserEntities");

            migrationBuilder.DropIndex(
                name: "RealmEntityName",
                table: "RealmEntities");

            migrationBuilder.DropIndex(
                name: "ModificatorEntityName",
                table: "ModificatorEntities");

            migrationBuilder.CreateIndex(
                name: "UserEntityUsername",
                table: "UserEntities",
                column: "Username",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "ModificatorEntityName",
                table: "ModificatorEntities",
                column: "Name",
                unique: true,
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UserEntityUsername",
                table: "UserEntities");

            migrationBuilder.DropIndex(
                name: "ModificatorEntityName",
                table: "ModificatorEntities");

            migrationBuilder.CreateIndex(
                name: "UserEntityUsername",
                table: "UserEntities",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RealmEntityName",
                table: "RealmEntities",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ModificatorEntityName",
                table: "ModificatorEntities",
                column: "Name",
                unique: true);
        }
    }
}
