using DataAccess.Entities;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.FilterServices;

public class ModificatorFilterService : IEntityFilterService<ModificatorEntity>
{
    private class ModificatorFilterDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
    
    public IQueryable<ModificatorEntity> FilterByJObject(IQueryable<ModificatorEntity> entities, JObject filterObject)
    {
        var filter = filterObject.ToObject<ModificatorFilterDto>();
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