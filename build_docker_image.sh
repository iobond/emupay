#!/usr/bin/env bash

REPO="jadajin"
IMAGE_NAME="emupay"
IMAGE="${REPO}/${IMAGE_NAME}"
TAG="${IMAGE}:latest"

# build docker image
echo "Building Image: ${TAG}"
docker build --build-arg VERSION=latest -t ${TAG}  -f Dockerfile .
if [ $? -eq 0 ]; then
    echo "Build Image ${TAG} success"
    docker tag ${TAG} "${IMAGE}:latest"
    if [ $? -eq 0 ] && [[ "$1" == "push" ]]; then
        docker push ${IMAGE}
    fi
else
    echo "Build Image ${TAG} failed"
fi
