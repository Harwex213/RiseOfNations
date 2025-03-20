using Common.Constants;
using DataAccess.Constants;
using DataAccess.Entities;
using DataAccess.Entities.Interfaces;
using EntityFramework.Exceptions.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<UserEntity> UserEntities { get; set; }
    public DbSet<RealmEntity> RealmEntities { get; set; }
    public DbSet<ModificatorEntity> ModificatorEntities { get; set; }
    public DbSet<GameVariableEntity> GameVariableEntities { get; set; }
    public DbSet<GamePartyEntity> GamePartyEntities { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseExceptionProcessor();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserEntity>().HasData(new List<UserEntity>
        {
            new()
            {
                Id = 1,
                Username = "Harwex",
                Password = "$2a$11$lMSwQjxeSha8HjlCG0APZ.46R12BlZbFyzQMZjD6gPjhPJtMdzRmS",
                UserRole = UserRoles.Admin,
                IsDeleted = false,
                Created = GameVariableEntity.GameVariablesDateTime,
                Updated = GameVariableEntity.GameVariablesDateTime
            }
        });
        modelBuilder.Entity<GameVariableEntity>().HasData(GameVariableEntity.GameVariablesInitial);

        modelBuilder.Entity<UserEntity>()
            .HasIndex(e => e.Username)
            .HasDatabaseName(EntitiesConstraintNames.UserEntityUsername)
            .HasFilter($"\"{nameof(Entity.IsDeleted)}\" = false")
            .IsUnique();
        
        modelBuilder.Entity<ModificatorEntity>()
            .HasIndex(e => e.Name)
            .HasDatabaseName(EntitiesConstraintNames.ModificatorEntityName)
            .HasFilter($"\"{nameof(Entity.IsDeleted)}\" = false")
            .IsUnique();
        
        modelBuilder.Entity<GameVariableEntity>()
            .HasQueryFilter(e => e.IsDeleted == false);
        modelBuilder.Entity<ModificatorEntity>()
            .HasQueryFilter(e => e.IsDeleted == false);
        modelBuilder.Entity<RealmEntity>()
            .HasQueryFilter(e => e.IsDeleted == false);
        modelBuilder.Entity<UserEntity>()
            .HasQueryFilter(e => e.IsDeleted == false);
    }

    public static void AddToContainer(IServiceCollection services, IConfiguration configuration)
    {
        Console.WriteLine("Using connection string: " + configuration.GetConnectionString("DefaultConnection"));
        
        services.AddDbContext<AppDbContext>(options =>
        {
            options
                .UseLazyLoadingProxies()
                .UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });
    }
}