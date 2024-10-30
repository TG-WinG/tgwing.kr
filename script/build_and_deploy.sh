#!/bin/bash

# 환경변수 설정
source .env

host=$EC2_HOST
username=$EC2_USERNAME

output=$(yarn build)
status=$?

if [ $status -ne 0 ]; then
  echo " === build error ==="
  echo "$output"
  exit 1
fi

# Upload deployment scripts
scp -i private_key.pem -r dist/* "${username}@${host}:/usr/share/nginx/html"
