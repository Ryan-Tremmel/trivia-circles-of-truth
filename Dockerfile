# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
