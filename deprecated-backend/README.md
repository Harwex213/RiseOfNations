# Migrations

---

**Add migration**:

`dotnet ef migrations add [migration_name] -s ./WebApi/WebApi.csproj -p DataAccess/DataAccess.csproj`

**Remove migration**:

`dotnet ef migrations remove -s ./WebApi/WebApi.csproj -p DataAccess/DataAccess.csproj`