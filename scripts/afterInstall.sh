cd /home/ubuntu/enigmator/enigmator-web-app/
wget https://enigmator-storage.s3.eu-west-3.amazonaws.com/enigmator-web-app/.env
npm run build
cd /home/ubuntu/enigmator/
docker-compose restart