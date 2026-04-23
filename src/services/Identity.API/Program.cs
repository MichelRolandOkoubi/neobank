using Identity.API.Data;
using Identity.API.Models;
using Identity.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<TokenService>();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddJwtBearer();

var app = builder.Build();

// Endpoints
app.MapPost("/register", async (RegisterRequest request, AppDbContext db, TokenService tokenService) =>
{
    if (await db.Users.AnyAsync(u => u.Email == request.Email))
        return Results.BadRequest("User already exists");

    var user = new User
    {
        Email = request.Email,
        PasswordHash = BC.HashPassword(request.Password)
    };

    db.Users.Add(user);
    await db.SaveChangesAsync();

    var token = tokenService.GenerateToken(user);
    return Results.Ok(new AuthResponse(token, "refresh_token_placeholder", user.Email));
});

app.MapPost("/login", async (LoginRequest request, AppDbContext db, TokenService tokenService) =>
{
    var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
    if (user == null || !BC.Verify(request.Password, user.PasswordHash))
        return Results.Unauthorized();

    var token = tokenService.GenerateToken(user);
    return Results.Ok(new AuthResponse(token, "refresh_token_placeholder", user.Email));
});

app.Run();
