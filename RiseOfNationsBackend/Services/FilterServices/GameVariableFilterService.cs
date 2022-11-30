using DataAccess.Entities;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.FilterServices;

public class GameVariableFilterService : IEntityFilterService<GameVariableEntity>
{
    private class GameVariableFilterDto
    {
        public string? Name { get; set; }
    }
    
    public IQueryable<GameVariableEntity> FilterByJObject(IQueryable<GameVariableEntity> entities, JObject filterObject)
    {
        var filter = filterObject.ToObject<GameVariableFilterDto>();
        if (filter?.Name != null)
        {
            entities = entities.Where(e => e.Name == filter.Name);
        }

        return entities;
    }
}