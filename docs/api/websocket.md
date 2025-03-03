# WebSocket API Documentation

TheMachine provides real-time updates via WebSocket connections. This document describes how to use the WebSocket API.

## Connection

Connect to the WebSocket endpoint:

```
ws://localhost:8000/ws
```

Authentication is required. Include a token in the connection URL:

```
ws://localhost:8000/ws?token=your_jwt_token
```

## Message Format

All messages are JSON objects with the following structure:

```json
{
  "type": "message_type",
  "data": {
    // message-specific data
  }
}
```

## Client-to-Server Messages

### Subscribe to Task Updates

```json
{
  "type": "subscribe",
  "data": {
    "channel": "task",
    "task_id": "task-123"
  }
}
```

### Subscribe to All Tasks

```json
{
  "type": "subscribe",
  "data": {
    "channel": "tasks"
  }
}
```

### Subscribe to Workflow Execution Updates

```json
{
  "type": "subscribe",
  "data": {
    "channel": "workflow_execution",
    "execution_id": "execution-123"
  }
}
```

### Subscribe to System Status

```json
{
  "type": "subscribe",
  "data": {
    "channel": "system_status"
  }
}
```

### Unsubscribe

```json
{
  "type": "unsubscribe",
  "data": {
    "channel": "task",
    "task_id": "task-123"
  }
}
```

### Execute Agent

```json
{
  "type": "execute_agent",
  "data": {
    "agent_id": "code-agent",
    "task": "Generate a React component",
    "model_id": "gpt-4o",
    "parameters": {
      "temperature": 0.7
    }
  }
}
```

### Cancel Task

```json
{
  "type": "cancel_task",
  "data": {
    "task_id": "task-123"
  }
}
```

## Server-to-Client Messages

### Task Update

```json
{
  "type": "task_update",
  "data": {
    "task_id": "task-123",
    "status": "in_progress",
    "progress": 0.5,
    "updated_at": "2025-03-01T12:02:30Z"
  }
}
```

### Task Completion

```json
{
  "type": "task_completion",
  "data": {
    "task_id": "task-123",
    "status": "completed",
    "progress": 1.0,
    "result": {
      // task-specific result data
    },
    "cost": 0.05,
    "completed_at": "2025-03-01T12:05:00Z"
  }
}
```

### Task Error

```json
{
  "type": "task_error",
  "data": {
    "task_id": "task-123",
    "status": "failed",
    "error": "Error message",
    "updated_at": "2025-03-01T12:05:00Z"
  }
}
```

### Workflow Execution Update

```json
{
  "type": "workflow_execution_update",
  "data": {
    "execution_id": "execution-123",
    "status": "in_progress",
    "current_step_id": "step2",
    "updated_at": "2025-03-01T12:02:30Z"
  }
}
```

### System Status Update

```json
{
  "type": "system_status_update",
  "data": {
    "api_status": "operational",
    "database_status": "operational",
    "vector_db_status": "operational",
    "model_service_status": "operational",
    "active_tasks": 5,
    "pending_tasks": 2,
    "updated_at": "2025-03-01T12:00:00Z"
  }
}
```

### Error Message

```json
{
  "type": "error",
  "data": {
    "code": "invalid_request",
    "message": "Invalid request format"
  }
}
```

## Connection Lifecycle

### Connection Established

Upon successful connection, the server sends a welcome message:

```json
{
  "type": "connection_established",
  "data": {
    "client_id": "client-123",
    "server_time": "2025-03-01T12:00:00Z"
  }
}
```

### Ping/Pong

The server sends periodic ping messages to keep the connection alive:

```json
{
  "type": "ping",
  "data": {
    "timestamp": "2025-03-01T12:01:00Z"
  }
}
```

Clients should respond with a pong message:

```json
{
  "type": "pong",
  "data": {
    "timestamp": "2025-03-01T12:01:00Z"
  }
}
```

### Connection Closed

When the server closes the connection, it sends a message:

```json
{
  "type": "connection_closed",
  "data": {
    "reason": "session_timeout",
    "message": "Session timed out after 30 minutes of inactivity"
  }
}
```

## Error Handling

If the server encounters an error processing a message, it responds with an error message:

```json
{
  "type": "error",
  "data": {
    "code": "invalid_subscription",
    "message": "Cannot subscribe to non-existent task",
    "request_type": "subscribe",
    "request_data": {
      "channel": "task",
      "task_id": "non-existent-task"
    }
  }
}
```

## Examples

### Example: Monitoring a Task

1. Connect to the WebSocket endpoint
2. Subscribe to task updates:

```json
{
  "type": "subscribe",
  "data": {
    "channel": "task",
    "task_id": "task-123"
  }
}
```

3. Receive task updates:

```json
{
  "type": "task_update",
  "data": {
    "task_id": "task-123",
    "status": "in_progress",
    "progress": 0.2,
    "updated_at": "2025-03-01T12:01:00Z"
  }
}
```

```json
{
  "type": "task_update",
  "data": {
    "task_id": "task-123",
    "status": "in_progress",
    "progress": 0.5,
    "updated_at": "2025-03-01T12:02:30Z"
  }
}
```

```json
{
  "type": "task_completion",
  "data": {
    "task_id": "task-123",
    "status": "completed",
    "progress": 1.0,
    "result": {
      "code": "function hello() { return 'world'; }",
      "language": "javascript"
    },
    "cost": 0.05,
    "completed_at": "2025-03-01T12:05:00Z"
  }
}
```

4. Unsubscribe when done:

```json
{
  "type": "unsubscribe",
  "data": {
    "channel": "task",
    "task_id": "task-123"
  }
}
```

## Rate Limiting

WebSocket connections are subject to rate limiting:

- Maximum 10 connections per user
- Maximum 100 messages per minute per connection
- Maximum 50 subscriptions per connection

Exceeding these limits will result in the connection being closed with an error message.
