#!/bin/bash

docker build -t code_runner .
docker tag code_runner coderunnerregistry.azurecr.io/code_runner
docker push coderunnerregistry.azurecr.io/code_runner