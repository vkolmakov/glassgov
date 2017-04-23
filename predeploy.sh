cd ./client
yarn run build

cd ../server
cp -r ../client/dist ./
cp ../client/index.html ./
