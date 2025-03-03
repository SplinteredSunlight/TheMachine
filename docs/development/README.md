# Development Guide

This guide provides instructions for developers who want to contribute to TheMachine.

## Development Environment Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker and Docker Compose
- Git

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/TheMachine.git
   cd TheMachine
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Development dependencies
   ```

3. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up pre-commit hooks**:
   ```bash
   cd ..
   pip install pre-commit
   pre-commit install
   ```

5. **Start the development environment**:
   ```bash
   docker-compose up -d
   ```

## Project Structure

```
TheMachine/
├── backend/                # Backend services
│   ├── app/                # Main application code
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Dependencies
├── frontend/               # Frontend application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   └── utils/          # Utility functions
│   └── package.json        # Dependencies
├── docs/                   # Documentation
│   ├── architecture/       # Architecture documentation
│   ├── api/                # API documentation
│   ├── development/        # Development guides
│   └── user/               # User guides
├── scripts/                # Utility scripts
├── deploy/                 # Deployment configurations
│   ├── docker/             # Docker configurations
│   └── kubernetes/         # Kubernetes configurations
└── docker-compose.yml      # Development environment
```

## Development Workflow

### Backend Development

1. **Activate the virtual environment**:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Run the backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Run tests**:
   ```bash
   pytest
   ```

4. **Generate API documentation**:
   ```bash
   python scripts/generate_api_docs.py
   ```

### Frontend Development

1. **Start the development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

### Docker Development

1. **Build and start all services**:
   ```bash
   docker-compose up -d --build
   ```

2. **View logs**:
   ```bash
   docker-compose logs -f
   ```

3. **Stop all services**:
   ```bash
   docker-compose down
   ```

## Coding Standards

### Python

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints
- Document functions and classes using docstrings
- Maximum line length: 88 characters (Black default)

### TypeScript/JavaScript

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Use ESLint and Prettier for code formatting
- Use functional components and hooks for React

### Git Workflow

1. **Create a new branch for each feature or bugfix**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make small, focused commits**:
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding or modifying tests
   - `chore:` for maintenance tasks

3. **Push your branch and create a pull request**:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Update your branch with the latest changes from main**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

## Testing

### Backend Testing

- Use pytest for unit and integration tests
- Aim for at least 80% code coverage
- Mock external dependencies
- Use fixtures for test data

### Frontend Testing

- Use Jest for unit tests
- Use React Testing Library for component tests
- Use Cypress for end-to-end tests
- Test components in isolation

## Documentation

- Document all public APIs
- Keep architecture documentation up-to-date
- Document complex algorithms and business logic
- Use diagrams to explain complex systems

## Continuous Integration

- All pull requests are automatically tested
- Code quality checks are enforced
- Documentation is automatically generated
- Test coverage is reported

## Troubleshooting

### Common Issues

1. **Port conflicts**:
   - Check if ports 8000 (backend) or 3000 (frontend) are already in use
   - Change the port in the configuration if needed

2. **Database connection issues**:
   - Ensure the database container is running
   - Check the database credentials in the environment variables

3. **Dependency issues**:
   - Update dependencies with `pip install -r requirements.txt` or `npm install`
   - Clear caches with `pip cache purge` or `npm cache clean --force`

### Getting Help

- Check the existing issues on GitHub
- Ask questions in the project's discussion forum
- Join the project's Discord server for real-time help

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Update documentation
6. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.
