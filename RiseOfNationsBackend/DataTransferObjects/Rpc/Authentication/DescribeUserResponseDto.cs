using Common.Interfaces;

namespace DataTransferObjects.Rpc.Authentication;

public class DescribeUserResponseDto : ResponseDto
{
    public string Username { get; set; } = null!;
    public string UserRole { get; set; } = null!;
    public string? Email { get; set; }
}