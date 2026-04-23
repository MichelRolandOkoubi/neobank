FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY src/services/Identity.API/Identity.API.csproj src/services/Identity.API/
RUN dotnet restore src/services/Identity.API/Identity.API.csproj

COPY . .
RUN dotnet publish src/services/Identity.API/Identity.API.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "Identity.API.dll"]
