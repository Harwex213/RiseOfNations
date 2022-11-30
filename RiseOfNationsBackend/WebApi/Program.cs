using WebApi;

var builder = WebApplication.CreateBuilder(args);
// builder.Host.ConfigureAppConfiguration((_, config) =>
// {
//     config.AddJsonFile(Path.GetFullPath(Configuration.CommonConstantsFilePath), false);
// });
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);
var app = builder.Build();
startup.OnBuild(app);
startup.Configure(app, builder.Environment);
app.Run();