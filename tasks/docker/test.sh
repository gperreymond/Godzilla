#!/bin/bash

docker load --input /tmp/images/godzilla.tar

export GOSS_FILES_STRATEGY=cp
export GOSS_SLEEP=30

curl -fsSL https://goss.rocks/install | sh
sleep 2s

dgoss run -e ENABLE_DGOSS=1 gperreymond/godzilla
