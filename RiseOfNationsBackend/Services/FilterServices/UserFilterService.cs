using DataAccess.Entities;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.FilterServices;

public class UserFilterService : IEntityFilterService<UserEntity>
{
    private class UserFilterDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
    }
    
    public IQueryable<UserEntity> FilterByJObject(IQueryable<UserEntity> entities, JObject filterObject)
    {
        var filter = filterObject.ToObject<UserFilterDto>();
        if (filter?.Username != null)
        {
            entities = entities.Where(e => e.Username == filter.Username);
        }
        if (filter?.Password != null)
        {
            entities = entities.Where(e => e.Password == filter.Password);
        }
        if (filter?.Email != null)
        {
            entities = entities.Where(e => e.Email == filter.Email);
        }

        return entities;
    }
}