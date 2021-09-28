FROM node:12.16.1 AS development

WORKDIR /app/backend

RUN ls 

COPY package*.json ./
RUN ls -al
RUN npm install


COPY . .

RUN npm run build

################
## PRODUCTION ##
################
FROM node:14 AS production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/backend

COPY --from=development /app/ .

EXPOSE 8080

CMD [ "node", "dist/main" ]