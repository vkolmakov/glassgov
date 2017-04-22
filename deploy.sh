cd ./client
yarn run build

cd ../server
cp -r ../client/dist ./
cp ../client/index.html ./
git add .
git commit -m 'deploy'
git push heroku master
