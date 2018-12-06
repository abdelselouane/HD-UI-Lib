#!/bin/bash
echo "***[setup.sh]***: Initializing setup ..."

echo "***[setup.sh]***: Installing Root Dependencies"
npm i

echo "***[setup.sh]***: Installing Repair-Parts-Admin Dependencies"
cd packages/Repair-Parts-Admin 
npm i

echo "***[setup.sh]***: Building Repair-Parts-Admin ..."
npm run build

echo "***[setup.sh]***: Linking Repair-Parts-Admin ..."
npm link

echo "***[setup.sh]***: Installing Repair-Work-Order Dependencies ..."

cd ../Repair-Work-Order 
npm i

echo "***[setup.sh]***: Building Repair-Work-Order ..."
npm run build

echo "***[setup.sh]***: Linking Repair-Work-Order ..."
npm link

echo "***[setup.sh]***: Installing Repair-UI-Library-Server Dependencies"

cd ../Repair-UI-Library-Server 
npm i

echo "***[setup.sh]***: Linking Repair-Parts-Admin To Repair-UI-Library-Server"
npm link repair-parts-admin

echo "***[setup.sh]***: Linking Repair-Work-Order To Repair-UI-Library-Server"
npm link repair-work-order

echo "***[setup.sh]***: Returning to the Root..."
cd ../..