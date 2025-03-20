using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.Realm;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.InternalServices.Dtos;
using Services.InternalServices.Interfaces;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class RealmService : BaseRestService<RealmResponseDto, RealmEntity>, 
    IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto>
{
    public RealmService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<RealmEntity> filterService, IFileUploader fileUploader) 
        : base(dbContext, mapper, filterService)
    {
        FileUploader = fileUploader;
    }

    public IFileUploader FileUploader { get; set; }

    private async Task UploadFlagImage(Guid flagId, string? flagBase64, string? flagFileName)
    {
        try
        {
            if (flagBase64 != null && flagFileName != null)
            {
                await FileUploader.UploadRealmFlag(new FileUpload
                {
                    FileName = flagId,
                    SourceBase64 = flagBase64,
                    SourceFileName = flagFileName
                });
            }
        }
        catch (Exception)
        {
            // ignored
        }
    }
    
    public async Task<RealmResponseDto> Add(CreateRealmRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<RealmEntity>(requestDto);
            
            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.ModificatorId = requestDto.ModificatorId.Value;
            entity.UserId = requestDto.UserId.Value;
            entity.FlagId = Guid.NewGuid();
            if (requestDto.FlagFileName != null)
            {
                entity.FlagExtension = Path.GetExtension(requestDto.FlagFileName);
            }

            await ServiceHelper.AddEntity(DbContext, DbSet, entity);
            await UploadFlagImage(entity.FlagId, requestDto.FlagBase64, requestDto.FlagFileName);
            return Mapper.Map<RealmResponseDto>(entity);
        });
    }

    public async Task<RealmResponseDto> Update(long id, UpdateRealmRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = await DbSet.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.ModificatorId = requestDto.ModificatorId.Value;
            entity.UserId = requestDto.UserId.Value;
            if (requestDto.FlagFileName != null)
            {
                entity.FlagExtension = Path.GetExtension(requestDto.FlagFileName);
            }
            
            await ServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            await UploadFlagImage(entity.FlagId, requestDto.FlagBase64, requestDto.FlagFileName);
            return Mapper.Map<RealmResponseDto>(entity);
        });
    }
}