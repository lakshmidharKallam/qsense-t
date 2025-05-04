## Dockerfile
################################
## BUILD ENVIRONMENT ###########
################################

FROM node:20-alpine3.20 As build

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./

RUN npm ci

COPY ./ ./

# Inject environment variables into React build
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

################################
#### PRODUCTION ENVIRONMENT ####
################################


FROM nginx:stable-alpine as production

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8000

ENTRYPOINT ["nginx", "-g", "daemon off;"] 