# syntax=docker/dockerfile:1
FROM node:lts-fermium
COPY . .
RUN yarn install
RUN npm i @vue/eslint-config-prettier
RUN yarn add eslint-config-developit
RUN yarn add eslint-plugin-vue-libs
EXPOSE 3000
CMD [ "yarn", "run", "dev:host"]
