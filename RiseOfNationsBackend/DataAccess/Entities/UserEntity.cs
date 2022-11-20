using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common;
using Common.Constants;
using Common.Constants.Constraints;
using Common.Interfaces;
using DataAccess.Constants;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

[Index(nameof(Username), IsUnique = true, Name = EntitiesConstraintNames.UserEntityUsername)]
public class UserEntity : Entity
{
    [MaxLength(UserConstraints.UsernameMaxLength)]
    public string Username { get; set; }
    
    [MaxLength(UserConstraints.PasswordMaxLength)]
    public string Password { get; set; }
    
    [MaxLength(UserConstraints.EmailMaxLength)]
    public string? Email { get; set; }
    
    public UserRoles UserRole { get; set; }
}