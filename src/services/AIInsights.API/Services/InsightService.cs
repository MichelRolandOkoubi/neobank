using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace AIInsights.API.Services;

public class InsightService
{
    private readonly Kernel _kernel;

    public InsightService(IConfiguration config)
    {
        var builder = Kernel.CreateBuilder();
        builder.AddOpenAIChatCompletion(
            modelId: "gpt-4o-mini",
            apiKey: config["OpenAI:ApiKey"] ?? throw new InvalidOperationException("API Key missing")
        );
        _kernel = builder.Build();
    }

    public async Task<string> CategorizeTransaction(string description, decimal amount)
    {
        var prompt = $@"Categorize this bank transaction into one of these 5 categories: 
        Food, Transport, Utilities, Entertainment, Shopping.
        Description: {description}, Amount: {amount} EUR.
        Return ONLY the category name.";

        var result = await _kernel.InvokePromptAsync(prompt);
        return result.ToString().Trim();
    }

    public async Task<string> GetSavingSuggestion(string monthlySummary)
    {
        var prompt = $@"Based on this monthly spending summary, provide ONE short, actionable saving suggestion (max 20 words):
        Summary: {monthlySummary}
        Suggestion:";

        var result = await _kernel.InvokePromptAsync(prompt);
        return result.ToString().Trim();
    }
}
