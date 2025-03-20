using Newtonsoft.Json;
using WebApi.Constants;

namespace WebApi.Extensions;

public class ServerSentEvent
{
    public string Name { get; set; } = null!;
    public object? Data { get; set; }
}

public static class ServerSentEventsExtensions
{
    public static async Task InitServerSentEventAsync(this HttpContext ctx)
    {
        ctx.Response.Headers.Add("Cache-Control", "no-cache");
        ctx.Response.Headers.Add("Content-Type", ServerSentEvents.ContentTypeName);
        await ctx.Response.Body.FlushAsync();
    }
    
    public static async Task SendServerSentEventAsync(this HttpContext ctx, ServerSentEvent e)
    {
        await ctx.Response.WriteAsync("event: " + e.Name + "\n");

        var lines = e.Data switch
        {
            null        => new [] { string.Empty },
            string s    => s.Split('\n').ToArray(),
            _           => new [] { JsonConvert.SerializeObject(e.Data) }
        };

        foreach(var line in lines)
            await ctx.Response.WriteAsync("data: " + line + "\n");

        await ctx.Response.WriteAsync("\n");
        await ctx.Response.Body.FlushAsync();
    }
}