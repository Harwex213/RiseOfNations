using System.Net;
using System.Text.Json;
using DataTransferObjects;
using DataTransferObjects.Error;
using Services.Exceptions;

namespace WebApi.Middleware;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var response = context.Response;
            
            var httpStatusCode = error switch
            {
                BadRequestException => HttpStatusCode.BadRequest,
                NotFoundException => HttpStatusCode.NotFound,
                _ => HttpStatusCode.InternalServerError
            };
            response.StatusCode = (int) httpStatusCode;
            
            response.ContentType = "application/json";
            var result = JsonSerializer.Serialize(new RequestErrorDto(error.Message), new JsonSerializerOptions
            {
                DictionaryKeyPolicy = JsonNamingPolicy.CamelCase
            });
            await response.WriteAsync(result);
        }
    }
}