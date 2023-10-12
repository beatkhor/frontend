# Stage: Build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG build_script
RUN npm run $build_script
RUN sed -i "s|/en-US/|/ |g"dist/apps/beatkhor/en-US/index.html



# Stage: Run
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/apps/beatkhor /usr/share/nginx/html/