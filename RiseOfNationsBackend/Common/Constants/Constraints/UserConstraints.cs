namespace Common.Constants.Constraints;

public static class UserConstraints
{
    public const int UsernameMaxLength = 50;
    public const int PasswordMaxLength = 20;
    public const int HashedPasswordMaxLength = 256;
    public const int EmailMaxLength = 50;
    public const int UserRoleMaxLength = 50;
}

public static class UserConstraintErrorMessages
{
    public const string UsernameMaxLength = "Username should be not longer than 50 chars";
    public const string PasswordMaxLength = "Password should be not longer than 20 chars";
    public const string EmailMaxLength = "Email should be not longer than 50 chars";
    public const string UserRoleMaxLength = "Role should be not longer than 50 chars";
}