#!/bin/bash

# If you're not already at root, cd into the dir
cd Repair-UI-Library
sh ./scripts/setup.sh
if [ $? -eq 0 ]
then
  npm run e2e
  exit 0
  echo "Success: e2e tests completed succesfully"
else
  echo "Failure: e2e tests failed to complete"
  exit 1
fi
cd ..
