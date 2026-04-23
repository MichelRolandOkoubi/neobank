using AIInsights.API.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSingleton<InsightService>();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddJwtBearer();

var app = builder.Build();

// Endpoints
app.MapPost("/insights/categorize", async ([FromBody] TransactionData data, InsightService insightService) =>
{
    var category = await insightService.CategorizeTransaction(data.Description, data.Amount);
    return Results.Ok(new { Category = category });
});

app.MapPost("/insights/suggest", async ([FromBody] string summary, InsightService insightService) =>
{
    var suggestion = await insightService.GetSavingSuggestion(summary);
    return Results.Ok(new { Suggestion = suggestion });
});

app.Run();

public record TransactionData(string Description, decimal Amount);
