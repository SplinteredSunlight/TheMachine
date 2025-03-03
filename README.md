# TheMachine

A unified AI development and orchestration platform that combines the best features from multiple AI projects.

## Overview

TheMachine is a comprehensive platform designed to streamline AI development and orchestration. It provides a unified interface for managing AI tasks, models, agents, and workflows, making it easier to build and deploy AI-powered applications.

## Features

- **Task Management**: Create, monitor, and manage AI tasks
- **Model Integration**: Configure and select from various AI models
- **Agent Orchestration**: Specialized AI entities for specific tasks
- **Workflow Automation**: Create sequences of operations for complex tasks
- **Real-time Updates**: WebSocket API for live status updates
- **Customizable Settings**: Configure API keys, UI preferences, and system settings

## Architecture

TheMachine consists of two main components:

1. **Backend**: A FastAPI-based API server that handles business logic, model integration, and data storage
2. **Frontend**: A React-based web application that provides a user-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Docker and Docker Compose (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TheMachine.git
   cd TheMachine
   ```

2. Start the development environment:
   ```bash
   ./start-dev.sh
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Manual Setup

If you prefer to set up the components manually:

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example`

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation

- [User Guide](docs/user/README.md): Instructions for using TheMachine
- [API Documentation](docs/api/README.md): Details on API endpoints
- [WebSocket API](docs/api/websocket.md): Real-time communication
- [Architecture](docs/architecture/README.md): System architecture overview
- [Development Guide](docs/development/README.md): Contributing to TheMachine

## Docker Deployment

To deploy TheMachine using Docker:

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
