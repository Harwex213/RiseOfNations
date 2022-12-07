using System.Net;
using System.Text.Json;
using DataTransferObjects;
using DataTransferObjects.Error;
using Services.Exceptions;
using Services.Exceptions.Base;

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
        catch (ServiceException serviceException)
        {
            var response = context.Response;
            response.StatusCode = serviceException.HttpCode;
            response.ContentType = "application/json";
            var result = JsonSerializer.Serialize(new RequestErrorDto(serviceException.Message), new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DictionaryKeyPolicy = JsonNamingPolicy.CamelCase
            });
            await response.WriteAsync(result);
        }
        catch (Exception)
        {
            var response = context.Response;
            response.StatusCode = (int) HttpStatusCode.InternalServerError;
            response.ContentType = "application/json";
            var result = JsonSerializer.Serialize(new RequestErrorDto("Internal server error"), new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DictionaryKeyPolicy = JsonNamingPolicy.CamelCase
            });
            await response.WriteAsync(result);
        }
    }
}