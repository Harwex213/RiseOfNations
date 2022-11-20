namespace Common.Constants.Constraints;

public static class UserConstraints
{
    public const int UsernameMaxLength = 50;
    public const int PasswordMaxLength = 256;
    public const int EmailMaxLength = 50;
}

public static class UserConstraintErrorMessages
{
    public const string UsernameMaxLength = "Username should be not longer than 50 chars";
    public const string PasswordMaxLength = "Password should be not longer than 256 chars";
    public const string EmailMaxLength = "Email should be not longer than 50 chars";
}