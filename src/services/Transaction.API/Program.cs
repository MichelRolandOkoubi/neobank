using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Transaction.API.Data;
using Transaction.API.Models;

var builder = WebApplication.CreateSlimBuilder(args);

// Native AOT JSON optimization
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

// Add services
builder.Services.AddDbContext<TransactionDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Endpoints
app.MapPost("/transactions", async (TransactionRequest request, TransactionDbContext db) =>
{
    // Simplified validation (synchronous for MVP)
    var fromAccount = await db.Accounts.FindAsync(request.FromAccountId);
    if (fromAccount == null || fromAccount.Balance < request.Amount)
        return Results.BadRequest("Insufficient funds or account not found");

    var toAccount = await db.Accounts.FindAsync(request.ToAccountId);
    if (toAccount == null)
        return Results.BadRequest("Destination account not found");

    // Perform transaction
    fromAccount.Balance -= request.Amount;
    toAccount.Balance += request.Amount;

    var transaction = new Transaction.API.Models.Transaction
    {
        FromAccountId = request.FromAccountId,
        ToAccountId = request.ToAccountId,
        Amount = request.Amount,
        Description = request.Description
    };

    db.Transactions.Add(transaction);
    
    // Simplified Event Sourcing (save event to table)
    var evt = new Event { 
        AggregateId = transaction.Id, 
        EventType = "TransactionCompleted", 
        Payload = $"{{\"from\":\"{request.FromAccountId}\", \"to\":\"{request.ToAccountId}\", \"amount\":{request.Amount}}}" 
    };
    db.Events.Add(evt);

    await db.SaveChangesAsync();

    return Results.Ok(new TransactionResponse(transaction.Id, "COMPLETED"));
});

app.Run();

[JsonSerializable(typeof(TransactionRequest))]
[JsonSerializable(typeof(TransactionResponse))]
[JsonSerializable(typeof(List<Transaction.API.Models.Transaction>))]
internal partial class AppJsonSerializerContext : JsonSerializerContext { }

// Internal models for AOT compatibility in this sample
namespace Transaction.API.Data {
    using Transaction.API.Models;
    public class TransactionDbContext : DbContext {
        public TransactionDbContext(DbContextOptions<TransactionDbContext> options) : base(options) { }
        public DbSet<Transaction.API.Models.Transaction> Transactions => Set<Transaction.API.Models.Transaction>();
        public DbSet<AccountProxy> Accounts => Set<AccountProxy>();
        public DbSet<Event> Events => Set<Event>();
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Transaction.API.Models.Transaction>().ToTable("transactions");
            modelBuilder.Entity<AccountProxy>().ToTable("accounts");
            modelBuilder.Entity<Event>().ToTable("events");
        }
    }

    public class AccountProxy {
        public Guid Id { get; set; }
        public decimal Balance { get; set; }
    }

    public class Event {
        public long Id { get; set; }
        public Guid AggregateId { get; set; }
        public string EventType { get; set; } = string.Empty;
        public string Payload { get; set; } = string.Empty; // JSONB in DB
    }
}
