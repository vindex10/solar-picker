#!/bin/bash
set -u

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
DOCKER="sudo docker"
NAME=test

build() {
	pushd "$SCRIPT_DIR"
	$DOCKER build -t "$NAME" -f docker/Dockerfile .
	popd
}

run() {
	$DOCKER run -it --rm \
		-v "$SCRIPT_DIR"/backend/src/static/hmax_overall.nc:/root/backend/src/static/hmax_overall.nc \
		-p 127.0.0.1:5000:5000 \
		-p 127.0.0.1:8000:8000 \
		"$NAME"
}

cmd="$1";
shift;
$cmd "$@"
