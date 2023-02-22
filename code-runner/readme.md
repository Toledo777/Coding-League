# Problem Runner Framework

## Requirements

This part of the project is made to run using [Deno](https://deno.land/),

Deno is an alternative JS runtime to Node that allows for runtime permissions to be controlled with much more granularity. This is what allows us to run untrusted code safely.

In order to get correct auto-complete and linting, please install the Deno language server extension as well.

## Container registry / Deployment

To deploy the container to the registry, we must login to it via docker
The username and password can be found in the `access keys` tab in Azure 
```bash
docker login coderunnerregistry.azurecr.io
```

Then we need to tag the built image with the registry so we can push to it

```bash
docker tag code_runner coderunnerregistry.azurecr.io/code_runner
docker push coderunnerregistry.azurecr.io/code_runner
```

## The container is hosted at

https://code-runner.azurewebsites.net/