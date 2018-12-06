#!/bin/bash
# If you're not already at root, cd into the dir

echo "*** [run-build.sh] ***: Initializing setup"

echo "*** [run-build.sh] ***: Installing Root Dependencies"
cd Repair-UI-Library
npm i

echo "*** [run-build.sh] ***: Installing Repair-Work-Order Dependencies"
cd packages/Repair-Work-Order
npm i

echo "*** [run-build.sh] ***: Build Repair-Work-Order Package"
npm run build

echo "*** [run-build.sh] ***: NPM install *** NPM-CLI-Login ***"
npm install -g npm-login-cli

# echo 'Sourcing resources for debuggin only'
# source ./../../scripts/.env_resources

REGISTRY='https://npm.artifactory.homedepot.com/artifactory/api/npm/npm/'
REGISTRY_USER=$1
REGISTRY_PASS=$2
REGISTRY_EMAIL=$3
REGISTRY_TOKEN=$4


echo '*** Setting **** Up NPM ****'
echo "*** Set Private Registry: "$REGISTRY"" >&2
# npm config set registry $REGISTRY
# npm config set _auth $REGISTRY_TOKEN
# npm config set Username $REGISTRY_USER
# npm config set email $REGISTRY_EMAIL
# npm config set always-auth true
# npm config set allow-same-version true
#npm config ls -l

npm-login-cli 'https://npm.artifactory.homedepot.com/artifactory/api/npm/npm/' $REGISTRY_USER $REGISTRY_PASS $REGISTRY_EMAIL

echo "*** [run-build.sh] ***: Publish Repair-Work-Order Package to npm Artifactory"
npm run package-publish 