using Common.Interfaces;
using DataTransferObjects.Rest;

namespace Services.RestServices.Interfaces;

public interface IRestService<TRequestCreateDto, TRequestUpdateDto, TResponseDto> 
    where TRequestCreateDto : RequestDto 
    where TRequestUpdateDto : RequestDto
    where TResponseDto : ResponseDto
{
    Task<(IEnumerable<TResponseDto>, int count)> GetAll(GetAllDto getAllDto);
    Task<TResponseDto> Get(long id);
    Task<TResponseDto> Add(TRequestCreateDto requestDto);
    Task<TResponseDto> Update(long id, TRequestUpdateDto requestDto);
    Task<TResponseDto> Delete(long id);
}