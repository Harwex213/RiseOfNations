﻿using DataAccess;
using DataAccess.Constants;
using DataAccess.Entities.Interfaces;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Services.Exceptions;

namespace Services.InternalServices;

public static class ServiceHelper
{
    public static async Task Execute(Action action)
    {
        await Execute(() =>
        {
            action();
            return Task.FromResult(0);
        });
    }

    public static async Task<T> Execute<T>(Func<Task<T>> action)
    {
        try
        {
            return await action();
        }
        catch (UniqueConstraintException e)
        {
            if (e.InnerException is PostgresException postgresException)
            {
                var errorMessage = EntitiesConstraintNames.MapConstraintNameToError(postgresException.ConstraintName);
                throw new BadRequestException(errorMessage);
            }

            throw new BadRequestException();
        }
        catch (DbUpdateException e) when (e is CannotInsertNullException
                                              or MaxLengthExceededException
                                              or NumericOverflowException
                                              or ReferenceConstraintException)
        {
            throw new BadRequestException();
        }
    }
    
    public static async Task AddEntity<TEntity>(AppDbContext dbContext, DbSet<TEntity> dbSet, TEntity entity) where TEntity : Entity
    {
        entity.IsDeleted = false;
        entity.Created = DateTime.UtcNow;
        entity.Updated = DateTime.UtcNow;

        await dbSet.AddAsync(entity);
        await dbContext.SaveChangesAsync();
    }

    public static async Task UpdateEntity<TEntity>(AppDbContext dbContext, DbSet<TEntity> dbSet, TEntity entity)
        where TEntity : Entity
    {
        entity.IsDeleted = false;
        entity.Updated = DateTime.UtcNow;

        dbSet.Update(entity);
        await dbContext.SaveChangesAsync();
    }

    public static async Task DeleteEntity<TEntity>(AppDbContext dbContext, DbSet<TEntity> dbSet, TEntity entity)
        where TEntity : Entity
    {
        entity.Delete();
        entity.CascadeDelete();

        dbSet.Update(entity);
        await dbContext.SaveChangesAsync();
    }
}