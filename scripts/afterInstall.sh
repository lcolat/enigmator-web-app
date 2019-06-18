cd /home/ubuntu/enigmator/enigmator-web-app/
aws s3 cp s3://enigmator-storage/enigmator-web-app/.env .env
npm run build
cd /home/ubuntu/enigmator/
sudo docker-compose restart