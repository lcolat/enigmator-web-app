#!/bin/bash
PATH="/home/ubuntu/.local/bin:$PATH"
cd /home/ubuntu/enigmator/enigmator-web-app/
sudo aws s3 cp s3://enigmator-storage/enigmator-web-app/.env .env
sudo npm install
sudo npm run build
cd /home/ubuntu/enigmator/
sudo docker-compose restart