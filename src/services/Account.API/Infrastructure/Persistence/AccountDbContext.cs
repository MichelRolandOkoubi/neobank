using Account.API.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Account.API.Infrastructure.Persistence;

public class AccountDbContext : DbContext
{
    public AccountDbContext(DbContextOptions<AccountDbContext> options) : base(options) { }

    public DbSet<UserAccount> Accounts => Set<UserAccount>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserAccount>().ToTable("accounts");
        modelBuilder.Entity<UserAccount>().HasIndex(a => a.UserId);
        modelBuilder.Entity<UserAccount>().Property(a => a.Balance).HasPrecision(15, 2);
    }
}
