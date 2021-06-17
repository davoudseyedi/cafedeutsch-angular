#!/bin/bash

cd /var/www/dist/browser/
FILE="index"
EXT="html"
HASH_CODE=$(echo $(date) | md5sum | awk '{print substr($1, 1, 8)}')
head -n -2 "$FILE.$EXT" > "$FILE.tmp"
echo "<script type='text/javascript' src='build.$HASH_CODE.js'></script></body></html>" >> "$FILE.tmp"
cat runtime.*.js polyfills-es5.*.js polyfills.*.js scripts.*.js  main.*.js > build.$HASH_CODE.js
cat "$FILE.tmp" > "$FILE.$EXT"
echo '-----Bundles Concat finish-----'

