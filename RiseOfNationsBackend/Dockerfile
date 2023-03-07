FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY *.sln .
COPY WebApi/*.csproj ./WebApi/
COPY Services/*.csproj ./Services/
COPY DataTransferObjects/*.csproj ./DataTransferObjects/
COPY DataAccess/*.csproj ./DataAccess/
COPY Common/*.csproj ./Common/

RUN dotnet restore

COPY WebApi/. ./WebApi/
COPY Services/. ./Services/
COPY DataTransferObjects/. ./DataTransferObjects/
COPY DataAccess/. ./DataAccess/
COPY Common/. ./Common/

WORKDIR /app

RUN dotnet dev-certs https
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
COPY --from=build /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
ENTRYPOINT ["dotnet", "WebApi.dll", "--urls", "http://*:5000"]