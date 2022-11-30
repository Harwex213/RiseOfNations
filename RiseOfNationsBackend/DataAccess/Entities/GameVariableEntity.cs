using Common.Constants;
using DataAccess.Entities.Interfaces;

namespace DataAccess.Entities;

public class GameVariableEntity : Entity
{
    public GameVariableEntity()
    {
        Modificators  = new HashSet<ModificatorEntity>();
    }
    
    public string Name { get; set; }
    
    public short DefaultValue { get; set; }
    
    public virtual ICollection<ModificatorEntity> Modificators { get; set; }

    public override void CascadeDelete()
    {
        foreach (var modificatorEntity in Modificators)
        {
            modificatorEntity.Delete();
            modificatorEntity.CascadeDelete();
        }
    }

    private static readonly DateTime GameVariablesDateTime = new DateTime(2022, 11, 25).ToUniversalTime();
    public static readonly IEnumerable<GameVariableEntity> GameVariablesInitial = new List<GameVariableEntity>
    {
        new()
        {
            Id = (long)GameVariables.TileIncome,
            Name = GameVariables.TileIncome.ToString(),
            DefaultValue = GameVariablesDefaults.TileIncome,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.FarmIncome,
            Name = GameVariables.FarmIncome.ToString(),
            DefaultValue = GameVariablesDefaults.FarmIncome,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.FarmCostInitial,
            Name = GameVariables.FarmCostInitial.ToString(),
            DefaultValue = GameVariablesDefaults.FarmCostInitial,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.FarmCostIncreasing,
            Name = GameVariables.FarmCostIncreasing.ToString(),
            DefaultValue = GameVariablesDefaults.FarmCostIncreasing,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.UnitMoveOnFriendTiles,
            Name = GameVariables.UnitMoveOnFriendTiles.ToString(),
            DefaultValue = GameVariablesDefaults.UnitMoveOnFriendTiles,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.UnitMoveOnEnemyTiles,
            Name = GameVariables.UnitMoveOnEnemyTiles.ToString(),
            DefaultValue = GameVariablesDefaults.UnitMoveOnEnemyTiles,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.UnitCostLevelOne,
            Name = GameVariables.UnitCostLevelOne.ToString(),
            DefaultValue = GameVariablesDefaults.UnitCostLevelOne,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.UnitCostLevelTwo,
            Name = GameVariables.UnitCostLevelTwo.ToString(),
            DefaultValue = GameVariablesDefaults.UnitCostLevelTwo,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.UnitCostLevelThree,
            Name = GameVariables.UnitCostLevelThree.ToString(),
            DefaultValue = GameVariablesDefaults.UnitCostLevelThree,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.TowerCostLevelOne,
            Name = GameVariables.TowerCostLevelOne.ToString(),
            DefaultValue = GameVariablesDefaults.TowerCostLevelOne,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        },
        new()
        {
            Id = (long)GameVariables.TowerCostLevelTwo,
            Name = GameVariables.TowerCostLevelTwo.ToString(),
            DefaultValue = GameVariablesDefaults.TowerCostLevelTwo,
            Created = GameVariablesDateTime,
            Updated = GameVariablesDateTime
        }
    };
}