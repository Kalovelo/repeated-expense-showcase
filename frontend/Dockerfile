# Stage 1 - the build process
FROM node:12.16.1 as development
WORKDIR /app/frontend
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build