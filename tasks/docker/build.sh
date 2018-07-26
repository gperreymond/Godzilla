#!/bin/bash
set -e

BUILD_DIR=${1:-.}

docker build -t gperreymond/$CIRCLE_PROJECT_REPONAME --build-arg CIRCLE_SHA1=$CIRCLE_SHA1 $BUILD_DIR

mkdir -p /tmp/images
docker save --output /tmp/images/${CIRCLE_PROJECT_REPONAME}.tar gperreymond/${CIRCLE_PROJECT_REPONAME}
