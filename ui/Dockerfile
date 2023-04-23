FROM node:16-alpine AS build

RUN npm i -g pnpm

# Fetch dependencies
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Copy all files
ADD . .

# Install dependencies from local store
RUN pnpm install --offline

ENV PUBLIC_SOCKET_URL="https://chat.gapi.me"

# Build app
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --production

FROM node:16-alpine as app

WORKDIR /app

COPY --from=build ./package.json ./package.json
# COPY --from=build ./node_modules ./node_modules
COPY --from=build ./build .

CMD [ "node", "index.js" ]