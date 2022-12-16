using System.Net;
using DataTransferObjects.Error;
using Newtonsoft.Json;
using Services.Exceptions.Base;
using WebApi.Constants;

namespace WebApi.Middleware;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlerMiddleware> _logger;

    public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
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
            var result = JsonConvert.SerializeObject(new RequestErrorDto(serviceException.Message));
            await response.WriteAsync(result);
        }
        catch (Exception e)
        {
            _logger.LogError("Server internal error: {errorMessage}", e.Message);
            var response = context.Response;
            if (response.ContentType == ServerSentEvents.ContentTypeName)
            {
                return;
            }
            response.StatusCode = (int) HttpStatusCode.InternalServerError;
            response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new RequestErrorDto("Internal server error"));
            await response.WriteAsync(result);
        }
    }
}