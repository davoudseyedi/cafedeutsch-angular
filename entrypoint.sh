#!/bin/bash

cat >/var/www/env.js <<EOL
    if (typeof localStorage === "undefined" || localStorage === null) {
        let LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
EOL
cd /var/www && cat env.js dist/server.js > server.js.tmp
mv /var/www/server.js.tmp /var/www/dist/server.js
#remove File
rm -rf .git .htaccess Dockerfile docker-compose* .gitlab-ci.yml build* angular.json

# Run optimize bundle script
bash /optimize_bundles.sh

# Start server with pm2
#pm2 start -i $NODE_INSTANCE -u www-data --no-daemon dist/server.js
pm2 start -i $NODE_INSTANCE --no-daemon dist/server.js

# Give permisson to log file
ls /var/www/dist/logs || mkdir /var/www/dist/logs
chmod 777 /var/www/dist/logs/access.log
