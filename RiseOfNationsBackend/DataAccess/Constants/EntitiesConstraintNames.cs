namespace DataAccess.Constants;

public static class EntitiesConstraintNames
{
    public const string UserEntityUsername = "UserEntityUsername";
    public const string RealmEntityName = "RealmEntityName";
    public const string ModificatorEntityName = "ModificatorEntityName";
    
    public static string MapConstraintNameToError(string? constraintName)
    {
        return constraintName switch
        {
            UserEntityUsername => "User username should be unique",
            RealmEntityName => "Realm name should be unique",
            ModificatorEntityName => "Modificator name should be unique",
            _ => "Entity should be unique"
        };
    }
}