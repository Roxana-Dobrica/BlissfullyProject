using Blissfully.API.Services;
using Blissfully.API.Utility;
using Blissfully.Application;
using Blissfully.Identity;
using Blissfully.Application.Contracts.Interfaces;
using Blissfully.Infrastructure;
using Microsoft.OpenApi.Models;
using Blissfully.Identity.Services;
using Blissfully.Infrastructure.Hubs;
using Blissfully.Infrastructure.Services;
using Blissfully.Application.Models;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Open", builder =>
    {
        builder
            .WithOrigins("http://localhost:5173", "https://localhost:7261") 
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); 
    });
});
var openAiSettings = new OpenAiSettings();
builder.Configuration.GetSection("OpenAiSettings").Bind(openAiSettings);
builder.Services.AddSingleton(openAiSettings);
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.Configure<EncryptionSettings>(builder.Configuration.GetSection("EncryptionSettings"));
builder.Services.Configure<NewsSettings>(builder.Configuration.GetSection("NewsSettings"));
builder.Services.Configure<OpenAiSettings>(builder.Configuration.GetSection("OpenAiSettings"));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ChatService>();

// Add services to the container.
builder.Services.AddHttpClient();
builder.Services.AddInfrastructureToDI(builder.Configuration);
builder.Services.AddInfrastructureIdentityToDI(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR(o =>
{
    o.EnableDetailedErrors = true;
});

builder.Services.AddSwaggerGen(c =>
{
c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
{
    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
    Name = "Authorization",
    In = ParameterLocation.Header,
    Type = SecuritySchemeType.ApiKey,
    Scheme = "Bearer"
});

c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,

            },
            new List<string>()
        }
    });

    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Blissfully API",
    });

    c.OperationFilter<FileResultContentTypeOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Open");
app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chatHub");
    endpoints.MapControllers();
});


app.Run();
