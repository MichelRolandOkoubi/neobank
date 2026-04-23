FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY src/gateway/ApiGateway/ApiGateway.csproj src/gateway/ApiGateway/
RUN dotnet restore src/gateway/ApiGateway/ApiGateway.csproj

COPY . .
RUN dotnet publish src/gateway/ApiGateway/ApiGateway.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
