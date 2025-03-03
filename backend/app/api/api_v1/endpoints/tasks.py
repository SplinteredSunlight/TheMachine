from typing import List, Optional
from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Query
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime
import uuid

router = APIRouter()

class TaskType(str, Enum):
    CODE = "code"
    DESIGN = "design"
    TEST = "test"
    SECURITY = "security"
    ANALYSIS = "analysis"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    VERIFYING = "verifying"
    COMPLETED = "completed"
    FAILED = "failed"

class TaskCreate(BaseModel):
    type: TaskType
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM)
    context: Optional[dict] = Field(default=None)

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    priority: Optional[TaskPriority] = None
    status: Optional[TaskStatus] = None
    context: Optional[dict] = None

class TaskResponse(BaseModel):
    id: str
    type: TaskType
    title: str
    description: str
    priority: TaskPriority
    status: TaskStatus
    progress: float = Field(0.0, ge=0.0, le=1.0)
    result: Optional[dict] = None
    error: Optional[str] = None
    cost: float = Field(0.0, ge=0.0)
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

# Mock data for development
TASKS = {}

@router.post("/", response_model=TaskResponse)
async def create_task(
    task: TaskCreate,
    background_tasks: BackgroundTasks
):
    """
    Create a new task for AI processing.
    """
    try:
        task_id = str(uuid.uuid4())
        now = datetime.now()
        
        task_data = {
            "id": task_id,
            "type": task.type,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "status": TaskStatus.PENDING,
            "progress": 0.0,
            "result": None,
            "error": None,
            "cost": 0.0,
            "created_at": now,
            "updated_at": now,
            "completed_at": None,
            "context": task.context or {}
        }
        
        TASKS[task_id] = task_data
        
        # In a real implementation, we would add the task to a queue for processing
        # background_tasks.add_task(process_task, task_id)
        
        return TaskResponse(**task_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str):
    """
    Get task status and results.
    """
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return TaskResponse(**TASKS[task_id])

@router.get("/", response_model=List[TaskResponse])
async def list_tasks(
    status: Optional[TaskStatus] = None,
    type: Optional[TaskType] = None,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    List all tasks with optional filtering.
    """
    filtered_tasks = list(TASKS.values())
    
    if status:
        filtered_tasks = [task for task in filtered_tasks if task["status"] == status]
    
    if type:
        filtered_tasks = [task for task in filtered_tasks if task["type"] == type]
    
    # Sort by created_at (newest first)
    filtered_tasks.sort(key=lambda x: x["created_at"], reverse=True)
    
    # Apply pagination
    paginated_tasks = filtered_tasks[offset:offset + limit]
    
    return [TaskResponse(**task) for task in paginated_tasks]

@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskUpdate):
    """
    Update task details.
    """
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = TASKS[task_id]
    
    # Update fields if provided
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            task_data[key] = value
    
    # Update the updated_at timestamp
    task_data["updated_at"] = datetime.now()
    
    # If status is being set to completed, set completed_at
    if task_update.status == TaskStatus.COMPLETED and task_data["completed_at"] is None:
        task_data["completed_at"] = datetime.now()
    
    TASKS[task_id] = task_data
    
    return TaskResponse(**task_data)

@router.delete("/{task_id}", response_model=dict)
async def delete_task(task_id: str):
    """
    Delete a task.
    """
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="Task not found")
    
    del TASKS[task_id]
    
    return {"message": f"Task {task_id} deleted successfully"}
