#!/bin/sh
cd /dist/muletto
if [ $configurationEnv == "custom" ]
then
  sed -i "s/socketio_port: 8081/socketio_port: $ngPort2/" main.js
  sed -i "s/socketio_port: 8081/socketio_port: $ngPort2/" main.js.map
fi

serve -l $ngPort1 &
cd /
node index.js $ngPort1 $ngPort2 $startX $startY $forkliftId $forkliftToken 