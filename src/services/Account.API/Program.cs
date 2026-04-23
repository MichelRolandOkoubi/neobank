using Account.API.Application.Commands;
using Account.API.Application.Queries;
using Account.API.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<AccountDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddJwtBearer();

var app = builder.Build();

// Endpoints
app.MapPost("/accounts", async (Guid userId, IMediator mediator) =>
{
    var account = await mediator.Send(new CreateAccountCommand(userId));
    return Results.Created($"/accounts/{account.Id}", account);
});

app.MapGet("/accounts/user/{userId}", async (Guid userId, IMediator mediator) =>
{
    var account = await mediator.Send(new GetAccountByUserIdQuery(userId));
    return account is not null ? Results.Ok(account) : Results.NotFound();
});

app.Run();
