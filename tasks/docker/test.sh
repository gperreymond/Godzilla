#!/bin/bash
set -e

echo "install goss"
curl -fsSL https://goss.rocks/install | sh
sleep 2s

echo "run the image"
docker load --input /tmp/images/${ECS_APP}.tar
docker run --network=host -e NODE_ENV=test -p 21974:21974 gperreymond/$ECS_APP

echo "waiting 30 seconds..."
sleep 30s

goss validate
