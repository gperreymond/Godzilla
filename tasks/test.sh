#!/bin/bash
set -e

NODE_ENV=test
echo "Environment: $NODE_ENV"

rm -rf coverage/unit

$(yarn bin)/standard
$(npm bin)/nyc --clean --reporter lcov --reporter json-summary --report-dir ./coverage/unit $(npm bin)/mocha --opts .mocharc
