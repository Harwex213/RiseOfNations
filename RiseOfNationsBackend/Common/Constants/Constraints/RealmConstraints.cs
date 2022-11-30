namespace Common.Constants.Constraints;

public class RealmConstraints
{
    public const int NameMaxLength = 64;
    public const int DescriptionMaxLength = 256;
}

public class RealmConstraintsErrorMessages
{
    public const string NameRequired = "Name should be set";
    public const string NameMaxLength = "Name should be not longer than 64 chars";
    public const string DescriptionMaxLength = "Description should be not longer than 256 chars";
    public const string UserIdRequired = "User should be set";
    public const string ModificatorIdRequired = "Modificator should be set";
}