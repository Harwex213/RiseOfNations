using AutoMapper;
using Common.Constants.ErrorMessages;
using DataAccess;
using DataTransferObjects.Rest.Realm;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
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
    
    public async Task<RealmResponseDto> GetRealm(long id)
    {
        var realm = await DbContext.RealmEntities.FirstOrDefaultAsync(e => e.Id == id);
        if (realm == null)
        {
            throw new NotFoundException(RealmsErrorMessages.RealmNotFound);
        }

        return Mapper.Map<RealmResponseDto>(realm);
    }

    public async Task<RealmResponseDto> GetUserRealm(long userId, long id)
    {
        var realm = await DbContext.RealmEntities.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
        if (realm == null)
        {
            throw new NotFoundException(RealmsErrorMessages.RealmNotFound);
        }

        return Mapper.Map<RealmResponseDto>(realm);
    }

    public async Task<ICollection<RealmResponseDto>> GetUserRealms(long userId)
    {
        var realms = await DbContext.RealmEntities.Where(e => e.UserId == userId)
            .OrderByDescending(e => e.Created).ToListAsync();

        return Mapper.Map<ICollection<RealmResponseDto>>(realms);
    }
}