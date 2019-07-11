#!/bin/bash
PATH="/home/ubuntu/.local/bin:$PATH"
cd /home/ubuntu/enigmator/enigmator-web-app/
sudo chown -Rf ubuntu:ubuntu /home/ubuntu/enigmator/enigmator-web-app/
sudo docker build -t enigmator-web-app .