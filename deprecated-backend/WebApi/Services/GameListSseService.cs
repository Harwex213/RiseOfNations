using System.Collections.Concurrent;
using WebApi.Extensions;

namespace WebApi.Services;

public interface IGameListSseService
{
    public void AddClient(HttpContext httpContext);
    public void RemoveClient(HttpContext? httpContext);
    public Task SendEventAsync(ServerSentEvent serverSentEvent);
}

public class GameListSseService : IGameListSseService
{
    private static readonly ConcurrentBag<HttpContext> Clients = new();
    
    public void AddClient(HttpContext httpContext)
    {
        Clients.Add(httpContext);
    }

    public void RemoveClient(HttpContext? httpContext)
    {
        Clients.TryTake(out httpContext);
    }

    public async Task SendEventAsync(ServerSentEvent serverSentEvent)
    {
        var sendEvents = Clients.Select(httpContext => httpContext.SendServerSentEventAsync(serverSentEvent));
        await Task.WhenAll(sendEvents);
    }
}