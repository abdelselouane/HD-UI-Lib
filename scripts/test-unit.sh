#!/bin/bash

# If you're not already at root, cd into the dir
cd Repair-UI-Library
sh ./scripts/setup.sh
if [ $? -eq 0 ]
then
  npm run test
  echo "Success: unit tests completed successfully"
else
  echo "Failure: unit tests failed to complete"
  exit 1
fi
cd ..
