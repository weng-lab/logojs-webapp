#!/bin/sh

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

cp config/config.${ENVIRONMENT}.json public/config.json
yarn
yarn build
