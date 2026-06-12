# Use Node.js 20 Alpine as the base image (required for Next.js 16+)
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

COPY .env .

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
# Expose the application port (default 3000)
EXPOSE 3000

# Start the app, using $PORT if provided, otherwise 3000
CMD ["sh", "-c", "PORT=${PORT:-3000} npm start"]
