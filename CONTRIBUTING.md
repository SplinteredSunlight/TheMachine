# Contributing to TheMachine

Thank you for your interest in contributing to TheMachine! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to understand what kind of behavior will and will not be tolerated.

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker and Docker Compose
- Git

### Development Environment Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/TheMachine.git
   cd TheMachine
   ```
3. Add the original repository as a remote to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/TheMachine.git
   ```
4. Follow the setup instructions in the [Development Guide](docs/development/README.md)

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following our coding standards and best practices

3. Write tests for your changes

4. Update documentation as needed

5. Run the tests to ensure everything passes:
   ```bash
   # Backend tests
   cd backend
   pytest
   
   # Frontend tests
   cd frontend
   npm test
   ```

6. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new feature"
   ```

7. Push your branch to your fork:
   ```bash
   git push -u origin feature/your-feature-name
   ```

8. Create a pull request from your fork to the main repository

## Pull Request Process

1. Ensure your PR includes tests for any new functionality
2. Update documentation to reflect any changes
3. Ensure all CI checks pass
4. Request a review from at least one maintainer
5. Address any feedback from reviewers
6. Once approved, a maintainer will merge your PR

## Coding Standards

### Python

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints
- Document functions and classes using docstrings
- Use Black for code formatting
- Use isort for import sorting
- Use flake8 for linting

### TypeScript/JavaScript

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Use ESLint and Prettier for code formatting
- Use functional components and hooks for React

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

Examples:
```
feat(auth): add JWT authentication
fix(api): handle null response from external service
docs: update installation instructions
```

## Testing Guidelines

- Write unit tests for all new functionality
- Write integration tests for API endpoints
- Write end-to-end tests for critical user flows
- Mock external dependencies in tests
- Aim for at least 80% code coverage

## Documentation Guidelines

- Document all public APIs
- Keep architecture documentation up-to-date
- Document complex algorithms and business logic
- Use diagrams to explain complex systems
- Write clear, concise documentation that is accessible to all skill levels

## Issue Reporting

When reporting issues, please use the provided issue templates and include:

1. A clear, descriptive title
2. A detailed description of the issue
3. Steps to reproduce the issue
4. Expected behavior
5. Actual behavior
6. Screenshots or logs (if applicable)
7. Environment information (OS, browser, etc.)

## Feature Requests

When requesting features, please:

1. Check if the feature has already been requested
2. Provide a clear, detailed description of the feature
3. Explain the use case and benefits
4. Consider how it fits into the existing architecture
5. Indicate if you're willing to help implement it

## Community

- Join our [Discord server](https://discord.gg/themachine) for real-time discussions
- Participate in our [GitHub Discussions](https://github.com/ORIGINAL_OWNER/TheMachine/discussions)
- Subscribe to our [mailing list](https://themachine.dev/mailing-list) for updates

## Recognition

All contributors will be recognized in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file. We value and appreciate all contributions, no matter how small!

## License

By contributing to TheMachine, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
