# Azure Durable Functions hello world

Testing Azure Durable Functions as a replacement for AWS step functions in building a cloud-agnostic Cumulus.

### Deploying these functions to Azure

Make sure you have access to an Azure account with a working subscription, ie pay-as-you-go, otherwise the CLI will not allow you to partition resources.

1. Install the Azure CLI (instructions for [Ubuntu](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest#signingKey)).

2. Log into the CLI: `az login`. This opens a login dialogue in a web browser.

3. Create a resource group:
```
az group create --name dsDurableFunctionsTest --location "West US"
````

4. Create a storage account:
```
az storage account create --name <STORAGE_ACCOUNT_NAME> --location "West US" --resource-group dsDurableFunctionsTest --sku Standard_LRS
```
Note, storage account names weirdly 1. can only contain lower-case alphanumeric characters and 2. must be unique.

5. Create a function resource:
```
az functionapp create --resource-group dsDurableFunctionsTest --consumption-plan-location westus --name dsDurableFunctions --storage-account <STORAGE_ACCOUNT_NAME> --runtime node
```

6. Create a zip of the `app` directory:
```
rm app.zip
cd app
zip -r ../app.zip ./*
```

7. Deploy the zip file:
```
az functionapp deployment source config-zip -g dsDurableFunctionsTest -n dsDurableFunctions --src app.zip
```

8. Test the basic function at `https://dsdurablefunctions.azurewebsites.net/api/reply`.
