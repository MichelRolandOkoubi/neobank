FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY src/services/AIInsights.API/AIInsights.API.csproj src/services/AIInsights.API/
RUN dotnet restore src/services/AIInsights.API/AIInsights.API.csproj

COPY . .
RUN dotnet publish src/services/AIInsights.API/AIInsights.API.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "AIInsights.API.dll"]
