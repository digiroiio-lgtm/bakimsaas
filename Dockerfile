# Dockerfile
# Build + preview server for Flight Pure (Vite)
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY flightpure/package*.json flightpure/

# Install with devDependencies so Vite and plugins are available for build
RUN npm install

# Copy the rest of the source
COPY . .

# Build the app (runs workspace build for flightpure)
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
