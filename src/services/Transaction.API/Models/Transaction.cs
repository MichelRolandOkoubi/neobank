namespace Transaction.API.Models;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FromAccountId { get; set; }
    public Guid ToAccountId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; } = "COMPLETED";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public record TransactionRequest(Guid FromAccountId, Guid ToAccountId, decimal Amount, string? Description);
public record TransactionResponse(Guid TransactionId, string Status);
