namespace DataAccess.Constants;

public static class EntitiesConstraintNames
{
    public const string UserEntityUsername = "UserEntityUsername";
    
    public static string MapConstraintNameToError(string? constraintName)
    {
        return constraintName switch
        {
            UserEntityUsername => "User username should be unique",
            _ => "Entity should be unique"
        };
    }
}