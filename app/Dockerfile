# Base image
FROM node:18-alpine

# Install Yarn
RUN apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
    apk del curl

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["yarn", "dev"]
