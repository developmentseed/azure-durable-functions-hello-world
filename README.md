# Azure Durable Functions hello world

Testing Azure Durable Functions as a replacement for AWS step functions in building a cloud-agnostic Cumulus.

## Prerequisites

Working with Azure Functions and newer bindings such as the Durable Function extension can be difficult if you're not using a Microsoft IDE. Furthermore, some core dependencies present gotcha's relating to version mismanagement. These pre-requisites are necessary to deploy and develop on these functions.

1. Azure CLI (instructions for [Ubuntu](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest#signingKey)).
1. [Azure functions core tools](https://github.com/Azure/azure-functions-core-tools), which I recommend using the global `npm` installation method.
1. [.NET 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2).


## Running these functions locally

1. Install node dependencies (in the `app` directory): `cd app && yarn install`.

2. Install [Azure function v2 bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings). The Azure functions core tools library will scan your functions and install the necessary bindings. However, at time of writing it includes a legacy version of the durable functions binding, which must be overridden.

```
cd app
# Install default bindings
func extensions install
# Override durable functions version
func extensions install --package Microsoft.Azure.WebJobs.Extensions.DurableTask --version 1.7.1
```

3. `cd app && func host start`


## Deploying these functions to Azure

Make sure you have access to an Azure account with a working subscription, ie pay-as-you-go, otherwise the CLI will not allow you to partition resources.

### Deployment steps

1. Log into the CLI: `az login`. This opens a login dialogue in a web browser.

2. Create a resource group:
```
az group create --name dsDurableFunctionsTest --location "West US"
````

3. Create a storage account:
```
az storage account create --name <STORAGE_ACCOUNT_NAME> --location "West US" --resource-group dsDurableFunctionsTest --sku Standard_LRS
```
Note, storage account names weirdly 1. can only contain lower-case alphanumeric characters and 2. must be unique.

4. Create a function resource:
```
az functionapp create --resource-group dsDurableFunctionsTest --consumption-plan-location westus --name dsDurableFunctions --storage-account <STORAGE_ACCOUNT_NAME> --runtime node
```

5. Install node dependencies (in the `app` directory): `cd app && yarn install`.

6. Install [Azure function v2 bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings). The Azure functions core tools library will scan your functions and install the necessary bindings. However, at time of writing it includes a legacy version of the durable functions binding, which must be overridden.

```
cd app
# Install default bindings
func extensions install
# Override durable functions version
func extensions install --package Microsoft.Azure.WebJobs.Extensions.DurableTask --version 1.7.1
```

7. Create a zip of the `app` directory:
```
rm app.zip
cd app
zip -r ../app.zip ./*
```

8. Deploy the zip file:
```
az functionapp deployment source config-zip -g dsDurableFunctionsTest -n dsDurableFunctions --src app.zip
```

9. Test the basic function at https://dsdurablefunctions.azurewebsites.net/api/reply.

10. Test the orchestrator function at https://dsdurablefunctions.azurewebsites.net/api/orchestrators/orchestrator.
