FROM mhart/alpine-node

WORKDIR /app

COPY src /app/src
COPY package.json /app/package.json
COPY public /app/public

RUN yarn install
RUN yarn run build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-p", "3000", "-s", "build"]
