using Account.API.Domain.Entities;
using Account.API.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Account.API.Application.Queries;

public record GetAccountByUserIdQuery(Guid UserId) : IRequest<UserAccount?>;

public class GetAccountByUserIdHandler : IRequestHandler<GetAccountByUserIdQuery, UserAccount?>
{
    private readonly AccountDbContext _context;

    public GetAccountByUserIdHandler(AccountDbContext context)
    {
        _context = context;
    }

    public async Task<UserAccount?> Handle(GetAccountByUserIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Accounts
            .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);
    }
}
