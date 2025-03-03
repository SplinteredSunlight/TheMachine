#!/bin/bash

# Stop the development environment
echo "Stopping TheMachine development environment..."

# Stop Docker containers if they are running
if [ -f "docker-compose.yml" ]; then
  echo "Stopping Docker containers..."
  docker-compose down
fi

# Find and kill any running development servers
echo "Stopping development servers..."

# Find and kill frontend dev server (typically on port 3000)
FRONTEND_PID=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_PID" ]; then
  echo "Stopping frontend server (PID: $FRONTEND_PID)..."
  kill -9 $FRONTEND_PID
fi

# Find and kill backend dev server (typically on port 8000)
BACKEND_PID=$(lsof -ti:8000)
if [ ! -z "$BACKEND_PID" ]; then
  echo "Stopping backend server (PID: $BACKEND_PID)..."
  kill -9 $BACKEND_PID
fi

echo "Development environment stopped."
