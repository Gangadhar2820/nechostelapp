# Use Node.js as base image
FROM node:18.9.1

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variables (PORT)
ENV PORT=3000

# Expose the correct port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
