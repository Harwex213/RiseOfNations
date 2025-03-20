using System.Linq.Expressions;
using System.Reflection;

namespace DataAccess.Utils;

public static class QueryExtensions
{
    public static IQueryable<TEntity> OrderByDynamically<TEntity>(this IQueryable<TEntity> source,
        string orderByProperty, string order)
    {
        var type = typeof(TEntity);
        var property = type.GetProperty(orderByProperty, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
        if (property == null)
        {
            return source;
        }
        
        var parameter = Expression.Parameter(type, "p");
        var propertyAccess = Expression.MakeMemberAccess(parameter, property);
        var orderByExpression = Expression.Lambda(propertyAccess, parameter);
        var command = order.ToLower() == "desc" ? "OrderByDescending" : "OrderBy";
        
        var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType },
            source.Expression, Expression.Quote(orderByExpression));
        return (IOrderedQueryable<TEntity>) source.Provider.CreateQuery<TEntity>(resultExpression);
    }
}