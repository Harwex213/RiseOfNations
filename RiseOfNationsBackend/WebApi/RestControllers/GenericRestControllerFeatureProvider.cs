namespace WebApi.RestControllers;

// public class GenericRestControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
// {
//     public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
//     {
//         var currentAssembly = typeof(IRestService<,>).Assembly;
//         var candidates = currentAssembly.GetExportedTypes()
//             .Where(x => x.IsDefined(typeof(GenerateRestControllerAttribute)));
//
//         foreach (var candidate in candidates)
//         {
//             var implementedInterface = candidate.GetTypeInfo().ImplementedInterfaces.FirstOrDefault();
//             if (implementedInterface == null)
//             {
//                 continue;
//             }
//
//             var arguments = implementedInterface.GenericTypeArguments;
//             
//             feature.Controllers.Add(typeof(RestController<,>).MakeGenericType(arguments[0], arguments[1]).GetTypeInfo());
//         }
//     }
// }