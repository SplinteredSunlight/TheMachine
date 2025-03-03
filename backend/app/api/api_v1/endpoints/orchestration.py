from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, BackgroundTasks, Query
from pydantic import BaseModel, Field
from enum import Enum
import uuid
from datetime import datetime

router = APIRouter()

class WorkflowType(str, Enum):
    SEQUENTIAL = "sequential"
    PARALLEL = "parallel"
    CONDITIONAL = "conditional"
    CUSTOM = "custom"

class WorkflowStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class WorkflowStepType(str, Enum):
    AGENT = "agent"
    HUMAN = "human"
    CONDITION = "condition"
    LOOP = "loop"

class WorkflowStep(BaseModel):
    id: str
    type: WorkflowStepType
    name: str
    description: Optional[str] = None
    agent_id: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None
    next_steps: Optional[List[str]] = None
    condition: Optional[str] = None

class WorkflowCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    type: WorkflowType
    steps: List[WorkflowStep]
    parameters: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None

class WorkflowUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    steps: Optional[List[WorkflowStep]] = None
    parameters: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None

class WorkflowResponse(BaseModel):
    id: str
    name: str
    description: str
    type: WorkflowType
    steps: List[WorkflowStep]
    parameters: Dict[str, Any]
    metadata: Dict[str, Any]
    is_active: bool
    created_at: datetime
    updated_at: datetime

class WorkflowExecutionCreate(BaseModel):
    workflow_id: str
    input_data: Dict[str, Any]
    parameters: Optional[Dict[str, Any]] = None

class WorkflowExecutionResponse(BaseModel):
    id: str
    workflow_id: str
    status: WorkflowStatus
    current_step_id: Optional[str] = None
    input_data: Dict[str, Any]
    output_data: Optional[Dict[str, Any]] = None
    parameters: Dict[str, Any]
    error: Optional[str] = None
    cost: float = 0.0
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

# Mock data for development
WORKFLOWS = {
    "code-review-workflow": {
        "id": "code-review-workflow",
        "name": "Code Review Workflow",
        "description": "Automated code review workflow",
        "type": WorkflowType.SEQUENTIAL,
        "steps": [
            {
                "id": "step1",
                "type": WorkflowStepType.AGENT,
                "name": "Code Analysis",
                "description": "Analyze code for issues",
                "agent_id": "code-agent",
                "parameters": {
                    "focus": "quality"
                },
                "next_steps": ["step2"]
            },
            {
                "id": "step2",
                "type": WorkflowStepType.AGENT,
                "name": "Security Check",
                "description": "Check for security vulnerabilities",
                "agent_id": "security-agent",
                "parameters": {
                    "focus": "security"
                },
                "next_steps": ["step3"]
            },
            {
                "id": "step3",
                "type": WorkflowStepType.HUMAN,
                "name": "Human Review",
                "description": "Human review of AI findings",
                "parameters": {},
                "next_steps": None
            }
        ],
        "parameters": {
            "timeout": 3600
        },
        "metadata": {},
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
}

WORKFLOW_EXECUTIONS = {}

@router.post("/workflows", response_model=WorkflowResponse)
async def create_workflow(workflow: WorkflowCreate):
    """
    Create a new workflow.
    """
    workflow_id = str(uuid.uuid4())
    now = datetime.now()
    
    workflow_data = {
        "id": workflow_id,
        "name": workflow.name,
        "description": workflow.description,
        "type": workflow.type,
        "steps": workflow.steps,
        "parameters": workflow.parameters or {},
        "metadata": workflow.metadata or {},
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }
    
    WORKFLOWS[workflow_id] = workflow_data
    
    return WorkflowResponse(**workflow_data)

@router.get("/workflows", response_model=List[WorkflowResponse])
async def list_workflows(
    type: Optional[WorkflowType] = None,
    is_active: Optional[bool] = None,
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """
    List available workflows with optional filtering.
    """
    filtered_workflows = list(WORKFLOWS.values())
    
    if type:
        filtered_workflows = [wf for wf in filtered_workflows if wf["type"] == type]
    
    if is_active is not None:
        filtered_workflows = [wf for wf in filtered_workflows if wf["is_active"] == is_active]
    
    # Sort by name
    filtered_workflows.sort(key=lambda x: x["name"])
    
    # Apply pagination
    paginated_workflows = filtered_workflows[offset:offset + limit]
    
    return [WorkflowResponse(**wf) for wf in paginated_workflows]

@router.get("/workflows/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(workflow_id: str):
    """
    Get details of a specific workflow.
    """
    if workflow_id not in WORKFLOWS:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return WorkflowResponse(**WORKFLOWS[workflow_id])

@router.patch("/workflows/{workflow_id}", response_model=WorkflowResponse)
async def update_workflow(workflow_id: str, workflow_update: WorkflowUpdate):
    """
    Update a workflow's details.
    """
    if workflow_id not in WORKFLOWS:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow_data = WORKFLOWS[workflow_id]
    
    # Update fields if provided
    update_data = workflow_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            workflow_data[key] = value
    
    workflow_data["updated_at"] = datetime.now()
    
    WORKFLOWS[workflow_id] = workflow_data
    
    return WorkflowResponse(**workflow_data)

@router.delete("/workflows/{workflow_id}", response_model=dict)
async def delete_workflow(workflow_id: str):
    """
    Delete a workflow.
    """
    if workflow_id not in WORKFLOWS:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    del WORKFLOWS[workflow_id]
    
    return {"message": f"Workflow {workflow_id} deleted successfully"}

@router.post("/executions", response_model=WorkflowExecutionResponse)
async def execute_workflow(
    execution: WorkflowExecutionCreate,
    background_tasks: BackgroundTasks
):
    """
    Execute a workflow.
    """
    if execution.workflow_id not in WORKFLOWS:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow = WORKFLOWS[execution.workflow_id]
    
    # Check if workflow is active
    if not workflow["is_active"]:
        raise HTTPException(status_code=400, detail="Workflow is not active")
    
    # Get first step
    if not workflow["steps"]:
        raise HTTPException(status_code=400, detail="Workflow has no steps")
    
    first_step = workflow["steps"][0]
    
    execution_id = str(uuid.uuid4())
    now = datetime.now()
    
    # Merge parameters
    merged_parameters = {**workflow["parameters"]}
    if execution.parameters:
        merged_parameters.update(execution.parameters)
    
    execution_data = {
        "id": execution_id,
        "workflow_id": execution.workflow_id,
        "status": WorkflowStatus.PENDING,
        "current_step_id": first_step["id"],
        "input_data": execution.input_data,
        "output_data": None,
        "parameters": merged_parameters,
        "error": None,
        "cost": 0.0,
        "created_at": now,
        "updated_at": now,
        "completed_at": None
    }
    
    WORKFLOW_EXECUTIONS[execution_id] = execution_data
    
    # In a real implementation, we would add the execution to a queue for processing
    # background_tasks.add_task(process_workflow_execution, execution_id)
    
    # For now, simulate starting the execution
    execution_data["status"] = WorkflowStatus.IN_PROGRESS
    
    return WorkflowExecutionResponse(**execution_data)

@router.get("/executions", response_model=List[WorkflowExecutionResponse])
async def list_executions(
    workflow_id: Optional[str] = None,
    status: Optional[WorkflowStatus] = None,
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """
    List workflow executions with optional filtering.
    """
    filtered_executions = list(WORKFLOW_EXECUTIONS.values())
    
    if workflow_id:
        filtered_executions = [ex for ex in filtered_executions if ex["workflow_id"] == workflow_id]
    
    if status:
        filtered_executions = [ex for ex in filtered_executions if ex["status"] == status]
    
    # Sort by created_at (newest first)
    filtered_executions.sort(key=lambda x: x["created_at"], reverse=True)
    
    # Apply pagination
    paginated_executions = filtered_executions[offset:offset + limit]
    
    return [WorkflowExecutionResponse(**ex) for ex in paginated_executions]

@router.get("/executions/{execution_id}", response_model=WorkflowExecutionResponse)
async def get_execution(execution_id: str):
    """
    Get details of a specific workflow execution.
    """
    if execution_id not in WORKFLOW_EXECUTIONS:
        raise HTTPException(status_code=404, detail="Workflow execution not found")
    
    return WorkflowExecutionResponse(**WORKFLOW_EXECUTIONS[execution_id])

@router.post("/executions/{execution_id}/cancel", response_model=WorkflowExecutionResponse)
async def cancel_execution(execution_id: str):
    """
    Cancel a workflow execution.
    """
    if execution_id not in WORKFLOW_EXECUTIONS:
        raise HTTPException(status_code=404, detail="Workflow execution not found")
    
    execution = WORKFLOW_EXECUTIONS[execution_id]
    
    # Check if execution can be cancelled
    if execution["status"] not in [WorkflowStatus.PENDING, WorkflowStatus.IN_PROGRESS]:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot cancel execution with status {execution['status']}"
        )
    
    # Update execution status
    execution["status"] = WorkflowStatus.FAILED
    execution["error"] = "Cancelled by user"
    execution["updated_at"] = datetime.now()
    
    WORKFLOW_EXECUTIONS[execution_id] = execution
    
    return WorkflowExecutionResponse(**execution)

@router.post("/model-selection", response_model=dict)
async def select_optimal_model(
    task_type: str,
    required_capabilities: List[str],
    context_size: Optional[int] = None,
    cost_sensitivity: float = Query(0.5, ge=0.0, le=1.0),
    preferred_provider: Optional[str] = None
):
    """
    Select the optimal model for a given task based on requirements and preferences.
    """
    # In a real implementation, this would:
    # 1. Query available models
    # 2. Filter by required capabilities
    # 3. Filter by context size
    # 4. Apply cost sensitivity and other preferences
    # 5. Return the best model
    
    # For now, return a mock response
    return {
        "selected_model": {
            "id": "gpt-4o-mini",
            "name": "GPT-4o Mini",
            "provider": "openai",
            "capabilities": ["text", "code", "reasoning", "planning"],
            "context_window": 128000,
            "cost_per_token": 0.00001,
        },
        "alternatives": [
            {
                "id": "gpt-4o",
                "name": "GPT-4o",
                "provider": "openai",
                "capabilities": ["text", "code", "reasoning", "planning", "vision"],
                "context_window": 128000,
                "cost_per_token": 0.00003,
                "reason_not_selected": "Higher cost"
            }
        ],
        "estimated_cost": {
            "tokens": context_size or 1000,
            "cost": 0.01
        }
    }
