﻿using Common.Interfaces;
using DataAccess.Entities;
using DataAccess.Entities.Interfaces;
using Newtonsoft.Json.Linq;

namespace Services.FilterServices.Interfaces;

public interface IEntityFilterService<TEntity> where TEntity : Entity
{
    public IQueryable<TEntity> FilterByJObject(IQueryable<TEntity> entities, JObject jObject);
}