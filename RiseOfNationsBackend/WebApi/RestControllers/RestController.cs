using Common.Interfaces;
using DataTransferObjects.Rest;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.RestServices.Interfaces;
using WebApi.Filters;

namespace WebApi.RestControllers;

[Route("rest-api/[controller]")]
public class RestController<TRequestCreateDto, TRequestUpdateDto, TResponseDto> : Controller
    where TRequestCreateDto : RequestDto 
    where TRequestUpdateDto : RequestDto
    where TResponseDto : ResponseDto
{
    public RestController(IRestService<TRequestCreateDto, TRequestUpdateDto, TResponseDto> service)
    {
        Service = service;
    }

    private IRestService<TRequestCreateDto, TRequestUpdateDto, TResponseDto> Service { get; }

    [HttpGet]
    public async Task<IEnumerable<TResponseDto>> GetAll([FromQuery] GetAllRequestQueryDto getAllRequestQueryDto)
    {
        static void TryParseRange(GetAllDto getAllDto, GetAllRequestQueryDto getAllRequestQueryDto)
        {
            try
            {
                if (string.IsNullOrEmpty(getAllRequestQueryDto.Range))
                {
                    return;
                }
                
                var possibleRange = JsonConvert.DeserializeObject<int[]>(getAllRequestQueryDto.Range);
                if (possibleRange is { Length: 2})
                {
                    getAllDto.Range = (possibleRange[0], possibleRange[1]);
                }
            }
            catch (Exception)
            {
                // ignored
            }
        }
        static void TryParseSort(GetAllDto getAllDto, GetAllRequestQueryDto getAllRequestQueryDto)
        {
            try
            {
                if (string.IsNullOrEmpty(getAllRequestQueryDto.Sort))
                {
                    return;
                }
                
                var possibleSort = JsonConvert.DeserializeObject<string[]>(getAllRequestQueryDto.Sort);
                if (possibleSort is { Length: 2})
                {
                    getAllDto.Sort = (possibleSort[0], possibleSort[1]);
                }
            }
            catch (Exception)
            {
                // ignored
            }
        }
        
        var getAllDto = new GetAllDto
        {
            Filter = getAllRequestQueryDto.Filter
        };
        TryParseRange(getAllDto, getAllRequestQueryDto);
        TryParseSort(getAllDto, getAllRequestQueryDto);
        var (response, count) = await Service.GetAll(getAllDto);
        if (getAllDto.Range.HasValue)
        {
            var (from, to) = getAllDto.Range.Value;
            Response.Headers.ContentRange = $"{Request.Path.Value.Replace("/rest-api/", "")} {from}-{to}/{count}";
        }
        return response;
    }
 
    [HttpGet("{id}")]
    public async Task<TResponseDto> Get(long id)
    {
        return await Service.Get(id);
    }
 
    [HttpPost]
    [ModelStateValidation]
    public async Task<TResponseDto> Create([FromBody] TRequestCreateDto requestDto)
    {
        return await Service.Add(requestDto);
    }
    
    [HttpPut("{id}")]
    [ModelStateValidation]
    public async Task<TResponseDto> Update(long id, [FromBody] TRequestUpdateDto requestDto)
    {
        return await Service.Update(id, requestDto);
    }
    
    [HttpDelete("{id}")]
    [ModelStateValidation]
    public async Task<TResponseDto> Delete(long id)
    {
        return await Service.Delete(id);
    }
}