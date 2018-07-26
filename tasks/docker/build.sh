#!/bin/bash

docker build -t gperreymond/godzilla --build-arg COMMIT_SHA1=$1 .

mkdir -p /tmp/images
docker save --output /tmp/images/godzilla.tar gperreymond/godzilla
