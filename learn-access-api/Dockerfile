FROM mcr.microsoft.com/playwright:v1.40.0

RUN useradd -ms /bin/bash sandbox

WORKDIR /testing

COPY dockerConfig/package.json dockerConfig/package-lock.json ./
RUN npm install

COPY runTest.js ./

USER sandbox

ENTRYPOINT ["node", "runTest.js"]
