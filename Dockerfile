# Use Node.js LTS version as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port (default port for NestJS is 3000)
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "start:dev"]
