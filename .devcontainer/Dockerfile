# Image metadata and config.
# Ideally, the Node.js version should match what we use on CI.
# See `executors > default-executor` in `.circleci/config.yml`.
FROM node:18.10.0

# Configure APT
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1

# Verify git and needed tools are installed
RUN apt-get install -y git procps

# Remove outdated yarn from /opt and install via package 
# so it can be easily updated via apt-get upgrade yarn
RUN rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn
# Install the Angular CLI
RUN npm install -g @angular/cli
# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

LABEL name="Angular dev environment" \
    description="This image can be used to create a dev environment for building Angular." \
    vendor="angular" \
    version="1.0"

EXPOSE 4000 4200 4433 5000 8080 9876


# Switch to `root` (CircleCI images use `circleci` as the user).
USER root


# Configure `Node.js`/`npm`.
# RUN npm config --global set user root


# Go! (And keep going.)
CMD ["tail", "--follow", "/dev/null"]