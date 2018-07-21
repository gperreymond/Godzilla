#!/bin/bash
set -e

NODE_ENV=test
echo "Environment: $NODE_ENV"

$(yarn bin)/standard
