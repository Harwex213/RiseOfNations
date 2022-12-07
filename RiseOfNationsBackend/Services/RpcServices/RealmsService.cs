using AutoMapper;
using DataAccess;
using DataTransferObjects.Rest.Realm;
using Microsoft.EntityFrameworkCore;
using Services.RpcServices.Interfaces;

namespace Services.RpcServices;

public class RealmsService : IRealmsService
{
    public RealmsService(AppDbContext dbContext, IMapper mapper)
    {
        DbContext = dbContext;
        Mapper = mapper;
    }

    public AppDbContext DbContext { get; set; }
    public IMapper Mapper { get; set; }

    
    public async Task<ICollection<RealmResponseDto>> GetUserRealms(long userId)
    {
        var realms = await DbContext.RealmEntities.Where(e => e.UserId == userId).ToListAsync();

        return Mapper.Map<ICollection<RealmResponseDto>>(realms);
    }
}