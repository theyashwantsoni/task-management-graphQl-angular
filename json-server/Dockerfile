FROM node:alpine
# ENV tmp_dir /tmp
ADD ./ /opt/webapp/

WORKDIR /opt/webapp
COPY . .
RUN npm install
CMD [ "npm", "start" ]
# RUN echo '{"tasks": [{"id": 1,"description": "lorem ipsum doler sit amet","name": "anything","price": "5","category":"1"}]}' > /tmp/test.json
# ENTRYPOINT ["json-server","--watch","data.json"]
