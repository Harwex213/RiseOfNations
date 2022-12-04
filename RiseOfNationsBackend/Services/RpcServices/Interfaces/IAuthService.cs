using DataTransferObjects.Rpc.Authentication;

namespace Services.RpcServices.Interfaces;

public interface IAuthService
{
    public Task<DescribeUserResponseDto> Register(RegisterDto loginDto);
    public Task<DescribeUserResponseDto> Login(LoginDto loginDto);
    public Task<DescribeUserResponseDto> Login(LoginDto loginDto, string targetRole);
}