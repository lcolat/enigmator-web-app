#!/bin/bash
PATH="/home/ubuntu/.local/bin:$PATH"
cd /home/ubuntu/enigmator/enigmator-web-app/
# cp /home/ubuntu/enigmator/environment-files/enigmator-web-app/.env /home/ubuntu/enigmator/enigmator-web-app/.env
chown -Rf ubuntu:ubuntu /home/ubuntu/enigmator/enigmator-web-app/
# rm -rf node_modules
# npm install
# npm run build
sudo docker build -t enigmator-web-app .
cd /home/ubuntu/enigmator/
docker-compose stop client
docker-compose rm -f -v client
docker-compose create --force-recreate client