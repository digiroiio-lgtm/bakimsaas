# Dockerfile
# Temel bir Node.js veya statik site için örnek
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --production || true
EXPOSE 3000
CMD ["npm", "start"]
