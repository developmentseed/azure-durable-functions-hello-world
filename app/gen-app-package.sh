rm ../app.zip
zip -r ../app.zip ./*
az functionapp deployment source config-zip -g dsDurableFunctionsTest -n dsDurableFunctions --src ../app.zip
