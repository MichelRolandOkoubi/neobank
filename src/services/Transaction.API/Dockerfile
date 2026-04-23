FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN apt-get update && apt-get install -y clang zlib1g-dev
WORKDIR /app

COPY src/services/Transaction.API/Transaction.API.csproj src/services/Transaction.API/
RUN dotnet restore src/services/Transaction.API/Transaction.API.csproj

COPY . .
RUN dotnet publish src/services/Transaction.API/Transaction.API.csproj -c Release -r linux-x64 -o /out

FROM mcr.microsoft.com/dotnet/nightly/runtime-deps:10.0-jammy-chiseled
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["./Transaction.API"]
