#!/bin/sh
# Builds docker container and tags it. Takes 1 arg:
# arg1: docker image tag (Optional)
# Example usage: scripts/build-image.sh v1.0.0
set -e


# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

# import common stuff
source scripts/lib/common.sh

# Exit if one arg not given
if [[ -z "$1" ]]; then
    echo "One argument required.";
    exit;
fi

docker build -t ${DOCKER_ORG}/${IMAGE_NAME}:${1} .
