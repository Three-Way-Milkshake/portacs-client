FROM node:14-alpine

COPY dist/ /dist
COPY index.js /index.js 
COPY node_package.json /package.json
COPY src/ /src

EXPOSE 4201

RUN npm i -g serve
RUN cd / ; npm i
# RUN cd dist/muletto ; serve -l 4201 &

CMD cd dist/muletto ; serve -l 4201 & node /index.js
# CMD node /index.js