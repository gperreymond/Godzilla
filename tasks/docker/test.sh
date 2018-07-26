#!/bin/bash
set -e

docker load --input /tmp/images/${CIRCLE_PROJECT_REPONAME}.tar

export GOSS_FILES_STRATEGY=cp
export GOSS_SLEEP=30

curl -fsSL https://goss.rocks/install | sh
sleep 2s

dgoss run -e ENABLE_DGOSS=1 -e NODE_ENV=test gperreymond/$CIRCLE_PROJECT_REPONAME
