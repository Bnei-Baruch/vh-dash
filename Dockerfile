FROM node:14.12.0-stretch as builder
RUN mkdir vh-dash && chown -R node:node vh-dash
WORKDIR /vh-dash
ADD . /vh-dash

RUN npm install

ARG BUILD=build
ENV ENVIRONMENT_NAME=$BUILD
#ENV PUBLIC_URL=/dash/
RUN echo $ENVIRONMENT_NAME
RUN yarn $ENVIRONMENT_NAME --output-path=build

FROM nginx:1.15

COPY nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vh-dash/build /usr/share/nginx/html
#COPY --from=builder /vh-dash/build/*.html /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

