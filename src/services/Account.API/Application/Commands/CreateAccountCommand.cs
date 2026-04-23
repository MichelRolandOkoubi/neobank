using Account.API.Domain.Entities;
using Account.API.Infrastructure.Persistence;
using MediatR;

namespace Account.API.Application.Commands;

public record CreateAccountCommand(Guid UserId) : IRequest<UserAccount>;

public class CreateAccountHandler : IRequestHandler<CreateAccountCommand, UserAccount>
{
    private readonly AccountDbContext _context;

    public CreateAccountHandler(AccountDbContext context)
    {
        _context = context;
    }

    public async Task<UserAccount> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
    {
        var account = new UserAccount
        {
            UserId = request.UserId,
            AccountNumber = "FR" + Random.Shared.Next(100000000, 999999999),
            Balance = 1000.00m // Welcome bonus
        };

        _context.Accounts.Add(account);
        await _context.SaveChangesAsync(cancellationToken);
        return account;
    }
}
