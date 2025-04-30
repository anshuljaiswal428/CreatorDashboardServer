# Use Node.js LTS
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose Cloud Run's default port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
