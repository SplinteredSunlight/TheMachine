# TheMachine API Documentation

This document provides an overview of the TheMachine API endpoints and how to use them.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:8000/api/v1
```

## Authentication

Most API endpoints require authentication. Include an `Authorization` header with a valid JWT token:

```
Authorization: Bearer <your_token>
```

## API Endpoints

### Tasks

Tasks represent AI operations that can be executed by the system.

#### List Tasks

```
GET /tasks
```

Query parameters:
- `status` (optional): Filter by task status (pending, in_progress, completed, failed)
- `type` (optional): Filter by task type (code, design, test, security, analysis)
- `limit` (optional): Maximum number of tasks to return (default: 10, max: 100)
- `offset` (optional): Number of tasks to skip (default: 0)

Response:
```json
[
  {
    "id": "task-123",
    "type": "code",
    "title": "Generate API endpoint",
    "description": "Create a new API endpoint for user authentication",
    "priority": "medium",
    "status": "completed",
    "progress": 1.0,
    "result": { ... },
    "error": null,
    "cost": 0.05,
    "created_at": "2025-03-01T12:00:00Z",
    "updated_at": "2025-03-01T12:05:00Z",
    "completed_at": "2025-03-01T12:05:00Z"
  },
  ...
]
```

#### Get Task

```
GET /tasks/{task_id}
```

Response:
```json
{
  "id": "task-123",
  "type": "code",
  "title": "Generate API endpoint",
  "description": "Create a new API endpoint for user authentication",
  "priority": "medium",
  "status": "completed",
  "progress": 1.0,
  "result": { ... },
  "error": null,
  "cost": 0.05,
  "created_at": "2025-03-01T12:00:00Z",
  "updated_at": "2025-03-01T12:05:00Z",
  "completed_at": "2025-03-01T12:05:00Z"
}
```

#### Create Task

```
POST /tasks
```

Request body:
```json
{
  "type": "code",
  "title": "Generate API endpoint",
  "description": "Create a new API endpoint for user authentication",
  "priority": "medium",
  "context": {
    "language": "python",
    "framework": "fastapi"
  }
}
```

Response:
```json
{
  "id": "task-123",
  "type": "code",
  "title": "Generate API endpoint",
  "description": "Create a new API endpoint for user authentication",
  "priority": "medium",
  "status": "pending",
  "progress": 0.0,
  "result": null,
  "error": null,
  "cost": 0.0,
  "created_at": "2025-03-01T12:00:00Z",
  "updated_at": "2025-03-01T12:00:00Z",
  "completed_at": null
}
```

#### Update Task

```
PATCH /tasks/{task_id}
```

Request body:
```json
{
  "title": "Updated task title",
  "status": "completed"
}
```

Response: Updated task object

#### Delete Task

```
DELETE /tasks/{task_id}
```

Response:
```json
{
  "message": "Task task-123 deleted successfully"
}
```

### Models

Models represent AI models that can be used for tasks.

#### List Models

```
GET /models
```

Query parameters:
- `provider` (optional): Filter by provider (openai, anthropic, local, custom)
- `capability` (optional): Filter by capability (text, code, reasoning, planning, vision, audio)
- `is_active` (optional): Filter by active status (true, false)
- `limit` (optional): Maximum number of models to return (default: 100, max: 1000)
- `offset` (optional): Number of models to skip (default: 0)

Response: Array of model objects

#### Get Model

```
GET /models/{model_id}
```

Response: Model object

#### Create Model

```
POST /models
```

Request body: Model creation parameters

Response: Created model object

#### Update Model

```
PATCH /models/{model_id}
```

Request body: Model update parameters

Response: Updated model object

#### Delete Model

```
DELETE /models/{model_id}
```

Response: Success message

#### Select Model for Task

```
POST /models/{model_id}/select
```

Request body:
```json
{
  "task_type": "code",
  "context_size": 5000
}
```

Response: Model selection result with cost estimate

### Agents

Agents are specialized AI entities that perform specific tasks.

#### List Agents

```
GET /agents
```

Query parameters: Filtering options

Response: Array of agent objects

#### Get Agent

```
GET /agents/{agent_id}
```

Response: Agent object

#### Create Agent

```
POST /agents
```

Request body: Agent creation parameters

Response: Created agent object

#### Update Agent

```
PATCH /agents/{agent_id}
```

Request body: Agent update parameters

Response: Updated agent object

#### Delete Agent

```
DELETE /agents/{agent_id}
```

Response: Success message

#### Execute Agent

```
POST /agents/{agent_id}/execute
```

Request body:
```json
{
  "task": "Generate a React component",
  "model_id": "gpt-4o",
  "parameters": {
    "temperature": 0.7
  }
}
```

Response: Agent execution result

### Workflows

Workflows are sequences of agent operations that accomplish complex tasks.

#### List Workflows

```
GET /orchestration/workflows
```

Query parameters: Filtering options

Response: Array of workflow objects

#### Get Workflow

```
GET /orchestration/workflows/{workflow_id}
```

Response: Workflow object

#### Create Workflow

```
POST /orchestration/workflows
```

Request body: Workflow creation parameters

Response: Created workflow object

#### Update Workflow

```
PATCH /orchestration/workflows/{workflow_id}
```

Request body: Workflow update parameters

Response: Updated workflow object

#### Delete Workflow

```
DELETE /orchestration/workflows/{workflow_id}
```

Response: Success message

#### Execute Workflow

```
POST /orchestration/executions
```

Request body:
```json
{
  "workflow_id": "workflow-123",
  "input_data": {
    "repository": "https://github.com/example/repo",
    "branch": "main"
  },
  "parameters": {
    "timeout": 3600
  }
}
```

Response: Workflow execution object

#### Get Workflow Execution

```
GET /orchestration/executions/{execution_id}
```

Response: Workflow execution object

#### List Workflow Executions

```
GET /orchestration/executions
```

Query parameters: Filtering options

Response: Array of workflow execution objects

#### Cancel Workflow Execution

```
POST /orchestration/executions/{execution_id}/cancel
```

Response: Updated workflow execution object

### Model Selection

#### Select Optimal Model

```
POST /orchestration/model-selection
```

Request body:
```json
{
  "task_type": "code",
  "required_capabilities": ["code", "reasoning"],
  "context_size": 10000,
  "cost_sensitivity": 0.7,
  "preferred_provider": "openai"
}
```

Response:
```json
{
  "selected_model": {
    "id": "gpt-4o-mini",
    "name": "GPT-4o Mini",
    "provider": "openai",
    "capabilities": ["text", "code", "reasoning", "planning"],
    "context_window": 128000,
    "cost_per_token": 0.00001
  },
  "alternatives": [...],
  "estimated_cost": {
    "tokens": 10000,
    "cost": 0.1
  }
}
```

## Error Responses

All API endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad request (invalid parameters)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not found
- 500: Internal server error

Error response body:
```json
{
  "detail": "Error message"
}
```

## Websocket API

Real-time updates are available via WebSocket connection:

```
ws://localhost:8000/ws
```

See the [WebSocket API documentation](websocket.md) for details.
