#!/bin/sh
cd /dist/user

serve -s -l $ngPort1 &
cd /
node index.js $ngPort1 $ngPort2