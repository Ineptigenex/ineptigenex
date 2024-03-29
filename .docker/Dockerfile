# OVEN - BUN Official Image
FROM oven/bun:latest as base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies to temp directory
FROM base as build

# Dev dependencies 
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Prod dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory to app directory
FROM base as prerelease
COPY --from=build /temp/dev/node_modules node_modules
COPY . .

# Test and build the app
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# Copy the app to the final image
FROM base as release
COPY --from=build /temp/prod/node_modules node_modules
COPY --from=prerelease /app/src/app.ts src/app.ts
COPY --from=prerelease /app/package.json package.json

USER bun
ENTRYPOINT [ "bun", "run", "dev" ]
