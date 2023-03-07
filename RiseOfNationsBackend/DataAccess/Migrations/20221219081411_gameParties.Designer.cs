﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20221219081411_gameParties")]
    partial class gameParties
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DataAccess.Entities.GamePartyEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<short>("TurnDuration")
                        .HasColumnType("smallint");

                    b.Property<int>("TurnsCompleted")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("WinnerUserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("WinnerUserId");

                    b.ToTable("GamePartyEntities");
                });

            modelBuilder.Entity("DataAccess.Entities.GameVariableEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<short>("DefaultValue")
                        .HasColumnType("smallint");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("GameVariableEntities");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)1,
                            IsDeleted = false,
                            Name = "TileIncome",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 2L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)5,
                            IsDeleted = false,
                            Name = "FarmIncome",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 3L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)12,
                            IsDeleted = false,
                            Name = "FarmCostInitial",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 4L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)2,
                            IsDeleted = false,
                            Name = "FarmCostIncreasing",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 5L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)4,
                            IsDeleted = false,
                            Name = "UnitMoveOnFriendTiles",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 6L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)1,
                            IsDeleted = false,
                            Name = "UnitMoveOnEnemyTiles",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 7L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)10,
                            IsDeleted = false,
                            Name = "UnitCostLevelOne",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 8L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)14,
                            IsDeleted = false,
                            Name = "UnitCostLevelTwo",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 9L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)20,
                            IsDeleted = false,
                            Name = "UnitCostLevelThree",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 10L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)12,
                            IsDeleted = false,
                            Name = "TowerCostLevelOne",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 11L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)20,
                            IsDeleted = false,
                            Name = "TowerCostLevelTwo",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 12L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)3,
                            IsDeleted = false,
                            Name = "TowerOutcomeLevelOne",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 13L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)6,
                            IsDeleted = false,
                            Name = "TowerOutcomeLevelTwo",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 14L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)2,
                            IsDeleted = false,
                            Name = "UnitOutcomeLevelOne",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 15L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)4,
                            IsDeleted = false,
                            Name = "UnitOutcomeLevelTwo",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 16L,
                            Created = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc),
                            DefaultValue = (short)7,
                            IsDeleted = false,
                            Name = "UnitOutcomeLevelThree",
                            Updated = new DateTime(2022, 11, 24, 21, 0, 0, 0, DateTimeKind.Utc)
                        });
                });

            modelBuilder.Entity("DataAccess.Entities.ModificatorEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AffectedGameVariableId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<short>("ModificatorValue")
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AffectedGameVariableId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ModificatorEntityName")
                        .HasFilter("\"IsDeleted\" = false");

                    b.ToTable("ModificatorEntities");
                });

            modelBuilder.Entity("DataAccess.Entities.RealmEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("FlagExtension")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<Guid>("FlagId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<long>("ModificatorId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ModificatorId");

                    b.HasIndex("UserId");

                    b.ToTable("RealmEntities");
                });

            modelBuilder.Entity("DataAccess.Entities.UserEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("UserRole")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasDatabaseName("UserEntityUsername")
                        .HasFilter("\"IsDeleted\" = false");

                    b.ToTable("UserEntities");
                });

            modelBuilder.Entity("DataAccess.Entities.GamePartyEntity", b =>
                {
                    b.HasOne("DataAccess.Entities.UserEntity", "WinnerUser")
                        .WithMany("GameParties")
                        .HasForeignKey("WinnerUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WinnerUser");
                });

            modelBuilder.Entity("DataAccess.Entities.ModificatorEntity", b =>
                {
                    b.HasOne("DataAccess.Entities.GameVariableEntity", "AffectedGameVariable")
                        .WithMany("Modificators")
                        .HasForeignKey("AffectedGameVariableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AffectedGameVariable");
                });

            modelBuilder.Entity("DataAccess.Entities.RealmEntity", b =>
                {
                    b.HasOne("DataAccess.Entities.ModificatorEntity", "Modificator")
                        .WithMany("Realms")
                        .HasForeignKey("ModificatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entities.UserEntity", "User")
                        .WithMany("Realms")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Modificator");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.Entities.GameVariableEntity", b =>
                {
                    b.Navigation("Modificators");
                });

            modelBuilder.Entity("DataAccess.Entities.ModificatorEntity", b =>
                {
                    b.Navigation("Realms");
                });

            modelBuilder.Entity("DataAccess.Entities.UserEntity", b =>
                {
                    b.Navigation("GameParties");

                    b.Navigation("Realms");
                });
#pragma warning restore 612, 618
        }
    }
}
