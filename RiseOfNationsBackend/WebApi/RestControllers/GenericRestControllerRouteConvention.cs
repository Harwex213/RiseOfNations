namespace WebApi.RestControllers;

// public class GenericRestControllerRouteConvention : IControllerModelConvention
// {
//     public void Apply(ControllerModel controller)
//     {
//         if (controller.ControllerType.IsGenericType == false)
//         {
//             return;
//         }
//
//         var genericType = controller.ControllerType.GenericTypeArguments[0];
//         var customNameAttribute = genericType.GetCustomAttribute<GenerateRestControllerAttribute>();
//
//         if (customNameAttribute?.Route == null)
//         {
//             throw new ApplicationException("Cannot set route attribute to rest controller with type " + 
//                                            genericType.Name + " because of null value");
//         }
//         
//         controller.Selectors.Add(new SelectorModel
//         {
//             AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(customNameAttribute.Route)),
//         });
//     }
// }