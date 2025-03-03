# TheMachine User Guide

Welcome to TheMachine, a unified AI development and orchestration platform. This guide will help you get started with using TheMachine effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard](#dashboard)
3. [Tasks](#tasks)
4. [Models](#models)
5. [Agents](#agents)
6. [Workflows](#workflows)
7. [Settings](#settings)
8. [Troubleshooting](#troubleshooting)

## Getting Started

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

### Initial Setup

1. Navigate to the Settings page
2. Configure your API keys:
   - OpenAI API Key
   - Anthropic API Key (optional)
3. Set your daily cost limit
4. Save your settings

## Dashboard

The Dashboard provides an overview of your TheMachine system:

- Active Tasks: Shows the number of tasks currently in progress
- Models: Displays the number of available AI models
- Agents: Shows the number of configured AI agents
- Workflows: Displays the number of automated workflows

The Dashboard also shows:
- Recent Tasks: A list of your most recent tasks
- System Status: The current status of various system components

## Tasks

Tasks are individual AI operations that can be executed by the system.

### Creating a Task

1. Navigate to the Tasks page
2. Click "Create Task"
3. Fill in the task details:
   - Type: Select the type of task (code, design, test, security, analysis)
   - Title: Enter a descriptive title
   - Description: Provide detailed instructions for the AI
   - Priority: Set the task priority (low, medium, high)
   - Context: Add any additional context (optional)
4. Click "Create" to submit the task

### Monitoring Tasks

The Tasks page displays all your tasks with their current status:
- Pending: Task is waiting to be processed
- In Progress: Task is currently being processed
- Verifying: Task is completed and being verified
- Completed: Task is successfully completed
- Failed: Task encountered an error

Click on any task to view its details, including:
- Task progress
- Results (for completed tasks)
- Error messages (for failed tasks)
- Cost information

### Managing Tasks

From the task details page, you can:
- Cancel a task that is in progress
- Delete a task
- Retry a failed task
- Export task results

## Models

The Models page allows you to manage the AI models available in the system.

### Available Models

TheMachine comes with several pre-configured models:
- GPT-4o: OpenAI's most capable model
- GPT-4o Mini: A smaller, faster version of GPT-4o
- Claude 3 Opus: Anthropic's most capable model

### Adding a Custom Model

1. Navigate to the Models page
2. Click "Add Model"
3. Fill in the model details:
   - Name: A descriptive name for the model
   - Provider: Select the provider (OpenAI, Anthropic, Local, Custom)
   - Model ID: The provider's model identifier
   - Capabilities: Select the model's capabilities
   - Context Window: The maximum context size
   - Cost: Set the cost per token
4. Click "Add" to save the model

### Model Selection

TheMachine can automatically select the most appropriate model for a task based on:
- Required capabilities
- Context size
- Cost sensitivity
- Preferred provider

To use automatic model selection:
1. Navigate to the Orchestration page
2. Click "Model Selection"
3. Enter your requirements
4. View the recommended model and alternatives

## Agents

Agents are specialized AI entities that perform specific tasks.

### Using Agents

1. Navigate to the Agents page
2. Select an agent based on your needs:
   - Code Generation Agent: Creates code based on requirements
   - Design Agent: Creates design artifacts and mockups
   - Testing Agent: Generates and executes tests
3. Click "Execute" on the agent card
4. Enter your task details
5. Click "Run" to execute the agent

### Creating Custom Agents

1. Navigate to the Agents page
2. Click "Create Agent"
3. Fill in the agent details:
   - Name: A descriptive name
   - Type: The agent type
   - Description: What the agent does
   - Capabilities: Select the agent's capabilities
   - Default Model: Choose a default AI model
   - Prompt Template: Define the agent's behavior
4. Click "Create" to save the agent

## Workflows

Workflows are sequences of agent operations that accomplish complex tasks.

### Using Workflows

1. Navigate to the Workflows page
2. Select a workflow:
   - Code Review Workflow: Automated code review
   - Design to Code Workflow: Convert design mockups to code
   - Security Scan Workflow: Scan code for security vulnerabilities
3. Click "Run" on the workflow card
4. Enter the required input data
5. Click "Execute" to start the workflow

### Creating Custom Workflows

1. Navigate to the Workflows page
2. Click "Create Workflow"
3. Fill in the workflow details:
   - Name: A descriptive name
   - Description: What the workflow does
   - Type: Sequential, Parallel, or Conditional
4. Add steps to the workflow:
   - Click "Add Step"
   - Select the step type (Agent, Human, Condition, Loop)
   - Configure the step
   - Set the next steps
5. Click "Create" to save the workflow

## Settings

The Settings page allows you to configure TheMachine to suit your needs.

### API Settings

- OpenAI API Key: Your OpenAI API key
- Anthropic API Key: Your Anthropic API key
- Default Model: The default model to use
- Daily Cost Limit: Maximum daily spending on AI models

### UI Settings

- Theme: Light, Dark, or System
- Enable Animations: Toggle UI animations
- Compact Mode: Reduce padding and spacing

### System Settings

- View system information
- Check component status
- Clear cached data

## Troubleshooting

### Common Issues

#### API Key Issues

If you encounter errors related to API keys:
1. Check that your API keys are correctly entered in Settings
2. Verify that your API keys are valid and have sufficient credits
3. Check if you've reached your daily cost limit

#### Task Failures

If a task fails:
1. Check the error message in the task details
2. Verify that the selected model supports the task type
3. Try reducing the complexity of the task
4. Try a different model

#### Performance Issues

If the system is slow:
1. Check your network connection
2. Try enabling Compact Mode in Settings
3. Disable animations in Settings
4. Close unused browser tabs

### Getting Help

If you need further assistance:
1. Check the [documentation](https://github.com/yourusername/TheMachine/docs)
2. Open an issue on [GitHub](https://github.com/yourusername/TheMachine/issues)
3. Contact support at support@themachine.dev
