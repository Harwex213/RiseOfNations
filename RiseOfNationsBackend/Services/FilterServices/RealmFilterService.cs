using DataAccess.Entities;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.FilterServices;

public class RealmFilterService : IEntityFilterService<RealmEntity>
{
    private class RealmFilterDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
    
    public IQueryable<RealmEntity> FilterByJObject(IQueryable<RealmEntity> entities, JObject filterObject)
    {
        var filter = filterObject.ToObject<RealmFilterDto>();
        if (filter?.Name != null)
        {
            entities = entities.Where(e => e.Name == filter.Name);
        }
        if (filter?.Description != null)
        {
            entities = entities.Where(e => e.Description == filter.Description);
        }

        return entities;
    }
}