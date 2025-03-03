#!/bin/bash

# Start the development environment using Docker Compose
echo "Starting TheMachine development environment..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 5

# Show status
echo "Development environment is running!"
echo ""
echo "Access the following services:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Documentation: http://localhost:8000/docs"
echo "- PgAdmin: http://localhost:5050 (admin@themachine.dev / admin)"
echo ""
echo "To view logs, run: docker-compose logs -f"
echo "To stop the environment, run: docker-compose down"
