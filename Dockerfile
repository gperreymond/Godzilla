FROM library/node:8-alpine
MAINTAINER Gilles Perreymond <gperreymond@viadeoteam.com>

# Automatic arguments pass from the ci
ARG COMMIT_SHA1

# Declare some hardcode environment vars for the image
ENV APP_LAST_COMMIT=$COMMIT_SHA1

RUN apk add --update bash

# Prepare the destination
RUN mkdir -p /usr/app
WORKDIR /usr/app
RUN apk add --update bash

# Add source files
COPY . /usr/app
RUN rm Dockerfile

# Make the install in the container to avoir compilation problems
RUN yarn install --production --ignore-scripts --pure-lockfile --ignore-engines

# Start application
ENTRYPOINT ["./docker-entrypoint.sh"]

# Expose ports
EXPOSE 21974
