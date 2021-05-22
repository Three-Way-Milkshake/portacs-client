FROM node:14-alpine

COPY node_package.json /package.json

RUN npm i -g serve nodemon
RUN cd / ; npm i

COPY dist/ /dist

COPY index.js /index.js 
COPY src/ /src
COPY forklift_launcher.sh /launcher.sh


ENV SERVER_ADDR=192.168.3.129
ENV ngPort1=4201
ENV ngPort2=8081
ENV startX=0
ENV startY=0
ENV forkliftId=f1
ENV forkliftToken=abc
ENV configurationEnv=default

EXPOSE $ngPort1
EXPOSE $ngPort2

# RUN cd dist/muletto ; serve -l 4201 &

# CMD cd dist/muletto ; serve -l ${angularPort} 
# CMD sleep 1000
CMD /launcher.sh
#& node /index.js ${angularPort} ${angularPort2} ${startX} ${startY} ${forkliftId} ${forkliftToken}
# CMD node /index.js