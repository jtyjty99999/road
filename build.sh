#!/bin/bash

echo "------------- build.sh start ------------"

declare -r __PWD__=$(pwd)

cd ${__PWD__}

envType=$1
declare __ENV__=${envType}

case $envType in
    daily )
    # 日常
    __ENV__="daily"
    ;;
    prepub )
    # 预发
    __ENV__="pre"
    ;;
    # 生产
    publish )
    __ENV__="production"
    ;;
    * )
    # 默认为日常
    __ENV__="daily"
    ;;
esac

echo "------------- config env: ${__ENV__} -------------------"
cp config/config_${__ENV__}.js config/index.js

tnpm install --python=/usr/local/bin/python2.6

echo "------------- build.sh end ------------"

exit 0
