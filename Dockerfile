FROM node:24 as builder

ARG PUBLIC_URL=""
ARG REACT_APP_COMMIT_SHA="dynamic"
ARG IS_STAGING_BUILD="true"

ENV PUBLIC_URL=${PUBLIC_URL}
ENV REACT_APP_STAGING="${IS_STAGING_BUILD}"
ENV REACT_APP_COMMIT_SHA="${REACT_APP_COMMIT_SHA}"

WORKDIR /vh-dash
ADD . /vh-dash

RUN mkdir vh-dash && \
    chown -R node:node vh-dash && \
    yarn install && \
    npm run-script build --output-path=build

FROM nginx:1.25

COPY nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /vh-dash/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
