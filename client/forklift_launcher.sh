#!/bin/sh
cd /dist/muletto
if [ $configurationEnv == "custom" ]
then
  sed -i "s/socketio_port: 8081/socketio_port: $ngPort2/" main.js
  sed -i "s/socketio_port: 8081/socketio_port: $ngPort2/" main.js.map
  sed -i "s/x: 0/x: $startX/" main.js
  sed -i "s/x: 0/x: $startX/" main.js.map
  sed -i "s/y: 0/y: $startY/" main.js
  sed -i "s/y: 0/y: $startY/" main.js.map
fi

serve -l $ngPort1 &
cd /
node index.js $ngPort1 $ngPort2 $startX $startY $forkliftId $forkliftToken
# nodemon -w index.js -x 'node index.js $ngPort1 $ngPort2 $startX $startY $forkliftId $forkliftToken || (sleep 0.5 ; touch index.js)'