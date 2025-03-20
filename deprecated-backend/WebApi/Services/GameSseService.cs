using System.Collections.Concurrent;
using WebApi.Extensions;

namespace WebApi.Services;

public interface IGameSseService
{
    public void CreateGroup(Guid groupId, HttpContext client);
    public void AddClient(Guid groupId, HttpContext client);
    public void RemoveClient(Guid groupId, HttpContext? httpContext);
    public Task SendEventAsync(Guid groupId, ServerSentEvent serverSentEvent);
}

public class GameSseService : IGameSseService
{
    private static readonly ConcurrentDictionary<Guid, ConcurrentBag<HttpContext>> ClientGroups = new();

    public void CreateGroup(Guid groupId, HttpContext client)
    {
        ClientGroups.TryAdd(groupId, new ConcurrentBag<HttpContext>(new[] { client }));
    }

    public void AddClient(Guid groupId, HttpContext client)
    {
        ClientGroups.TryGetValue(groupId, out var group);
        group?.Add(client);
    }

    public void RemoveClient(Guid groupId, HttpContext? httpContext)
    {
        ClientGroups.TryGetValue(groupId, out var group);
        if (group?.Count == 1)
        {
            ClientGroups.TryRemove(groupId, out _);
            return;
        }
        group?.TryTake(out httpContext);
    }

    public async Task SendEventAsync(Guid groupId, ServerSentEvent serverSentEvent)
    {
        ClientGroups.TryGetValue(groupId, out var group);
        if (group == null)
        {
            return;
        }
        
        var sendEvents = group.Select(httpContext => httpContext.SendServerSentEventAsync(serverSentEvent));
        await Task.WhenAll(sendEvents);
    }
}