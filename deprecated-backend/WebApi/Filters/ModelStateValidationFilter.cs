using DataTransferObjects.Error;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Filters;

public class ModelStateValidationAttribute : Attribute, IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid)
        {
            return;
        }

        var errors = context.ModelState.Where(v => v.Value?.Errors.Count > 0)
            .ToDictionary(
                v => v.Key,
                v => v.Value?.Errors.FirstOrDefault()?.ErrorMessage
                );
        context.Result = new BadRequestObjectResult(new RequestMultipleErrorDto
        {
            Errors = errors
        });
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}