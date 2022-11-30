namespace Common.Constants;

public enum GameVariables
{
    TileIncome = 1,
    FarmIncome = 2,
    FarmCostInitial = 3,
    FarmCostIncreasing = 4,
    UnitMoveOnFriendTiles = 5,
    UnitMoveOnEnemyTiles = 6,
    UnitCostLevelOne = 7,
    UnitCostLevelTwo = 8,
    UnitCostLevelThree = 9,
    TowerCostLevelOne = 10,
    TowerCostLevelTwo = 11,
}

public static class GameVariablesDefaults
{
    public const short TileIncome = 1;
    public const short FarmIncome = 5;
    public const short FarmCostInitial = 12;
    public const short FarmCostIncreasing = 2;
    public const short UnitMoveOnFriendTiles = 4;
    public const short UnitMoveOnEnemyTiles = 1;
    public const short UnitCostLevelOne = 10;
    public const short UnitCostLevelTwo = 14;
    public const short UnitCostLevelThree = 20;
    public const short TowerCostLevelOne = 12;
    public const short TowerCostLevelTwo = 20;
}