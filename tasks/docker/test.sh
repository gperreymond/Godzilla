#!/bin/bash

docker load --input /tmp/images/godzilla.tar

export GOSS_FILES_STRATEGY=cp
export GOSS_SLEEP=30

curl -fsSL https://goss.rocks/install | sudo sh
sleep 2s

dgoss run -e ENABLE_DGOSS=1 -e NODE_ENV=test -e APP_RABBITMQ_USER=${APP_RABBITMQ_USER} -e APP_RABBITMQ_PASS=${APP_RABBITMQ_PASS} gperreymond/godzilla
