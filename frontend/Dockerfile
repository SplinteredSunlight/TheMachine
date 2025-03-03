FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
