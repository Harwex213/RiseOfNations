using DataAccess.Entities;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.FilterServices;

public class GamePartyFilterService : IEntityFilterService<GamePartyEntity>
{
    private class GamePartyFilterDto
    {
        public string? Name { get; set; }
        public long? WinnerUserId { get; set; }
        public int? TurnsCompleted { get; set; }
        public short? TurnDuration { get; set; }
    }
    
    public IQueryable<GamePartyEntity> FilterByJObject(IQueryable<GamePartyEntity> entities, JObject filterObject)
    {
        var filter = filterObject.ToObject<GamePartyFilterDto>();
        if (filter?.Name != null)
        {
            entities = entities.Where(e => e.Name == filter.Name);
        }
        if (filter?.WinnerUserId != null)
        {
            entities = entities.Where(e => e.WinnerUserId == filter.WinnerUserId);
        }
        if (filter?.TurnsCompleted != null)
        {
            entities = entities.Where(e => e.TurnsCompleted == filter.TurnsCompleted);
        }
        if (filter?.TurnDuration != null)
        {
            entities = entities.Where(e => e.TurnDuration == filter.TurnDuration);
        }

        return entities;
    }
}