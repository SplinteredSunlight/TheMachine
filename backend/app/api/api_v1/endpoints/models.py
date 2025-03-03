from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from enum import Enum
import uuid

router = APIRouter()

class ModelProvider(str, Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    LOCAL = "local"
    CUSTOM = "custom"

class ModelCapability(str, Enum):
    TEXT = "text"
    CODE = "code"
    REASONING = "reasoning"
    PLANNING = "planning"
    VISION = "vision"
    AUDIO = "audio"

class ModelCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    provider: ModelProvider
    model_id: str = Field(..., description="Provider's model identifier")
    capabilities: List[ModelCapability]
    context_window: int = Field(..., gt=0)
    cost_per_prompt_token: float = Field(..., ge=0)
    cost_per_completion_token: float = Field(..., ge=0)
    max_tokens: Optional[int] = Field(None, gt=0)
    description: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class ModelUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    capabilities: Optional[List[ModelCapability]] = None
    context_window: Optional[int] = Field(None, gt=0)
    cost_per_prompt_token: Optional[float] = Field(None, ge=0)
    cost_per_completion_token: Optional[float] = Field(None, ge=0)
    max_tokens: Optional[int] = Field(None, gt=0)
    description: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None

class ModelResponse(BaseModel):
    id: str
    name: str
    provider: ModelProvider
    model_id: str
    capabilities: List[ModelCapability]
    context_window: int
    cost_per_prompt_token: float
    cost_per_completion_token: float
    max_tokens: Optional[int] = None
    description: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    is_active: bool = True

# Mock data for development
MODELS = {
    "gpt-4o": {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "provider": ModelProvider.OPENAI,
        "model_id": "gpt-4o",
        "capabilities": [
            ModelCapability.TEXT,
            ModelCapability.CODE,
            ModelCapability.REASONING,
            ModelCapability.PLANNING,
            ModelCapability.VISION
        ],
        "context_window": 128000,
        "cost_per_prompt_token": 0.00001,
        "cost_per_completion_token": 0.00003,
        "max_tokens": 4096,
        "description": "OpenAI's GPT-4o model",
        "metadata": {},
        "is_active": True
    },
    "gpt-4o-mini": {
        "id": "gpt-4o-mini",
        "name": "GPT-4o Mini",
        "provider": ModelProvider.OPENAI,
        "model_id": "gpt-4o-mini",
        "capabilities": [
            ModelCapability.TEXT,
            ModelCapability.CODE,
            ModelCapability.REASONING,
            ModelCapability.PLANNING
        ],
        "context_window": 128000,
        "cost_per_prompt_token": 0.000005,
        "cost_per_completion_token": 0.000015,
        "max_tokens": 4096,
        "description": "OpenAI's GPT-4o Mini model",
        "metadata": {},
        "is_active": True
    },
    "claude-3-opus": {
        "id": "claude-3-opus",
        "name": "Claude 3 Opus",
        "provider": ModelProvider.ANTHROPIC,
        "model_id": "claude-3-opus-20240229",
        "capabilities": [
            ModelCapability.TEXT,
            ModelCapability.CODE,
            ModelCapability.REASONING,
            ModelCapability.PLANNING,
            ModelCapability.VISION
        ],
        "context_window": 200000,
        "cost_per_prompt_token": 0.000015,
        "cost_per_completion_token": 0.000075,
        "max_tokens": 4096,
        "description": "Anthropic's Claude 3 Opus model",
        "metadata": {},
        "is_active": True
    }
}

@router.post("/", response_model=ModelResponse)
async def create_model(model: ModelCreate):
    """
    Register a new AI model.
    """
    model_id = str(uuid.uuid4())
    
    model_data = {
        "id": model_id,
        "name": model.name,
        "provider": model.provider,
        "model_id": model.model_id,
        "capabilities": model.capabilities,
        "context_window": model.context_window,
        "cost_per_prompt_token": model.cost_per_prompt_token,
        "cost_per_completion_token": model.cost_per_completion_token,
        "max_tokens": model.max_tokens,
        "description": model.description,
        "metadata": model.metadata or {},
        "is_active": True
    }
    
    MODELS[model_id] = model_data
    
    return ModelResponse(**model_data)

@router.get("/", response_model=List[ModelResponse])
async def list_models(
    provider: Optional[ModelProvider] = None,
    capability: Optional[ModelCapability] = None,
    is_active: Optional[bool] = None,
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """
    List available AI models with optional filtering.
    """
    filtered_models = list(MODELS.values())
    
    if provider:
        filtered_models = [model for model in filtered_models if model["provider"] == provider]
    
    if capability:
        filtered_models = [model for model in filtered_models if capability in model["capabilities"]]
    
    if is_active is not None:
        filtered_models = [model for model in filtered_models if model["is_active"] == is_active]
    
    # Sort by name
    filtered_models.sort(key=lambda x: x["name"])
    
    # Apply pagination
    paginated_models = filtered_models[offset:offset + limit]
    
    return [ModelResponse(**model) for model in paginated_models]

@router.get("/{model_id}", response_model=ModelResponse)
async def get_model(model_id: str):
    """
    Get details of a specific AI model.
    """
    if model_id not in MODELS:
        raise HTTPException(status_code=404, detail="Model not found")
    
    return ModelResponse(**MODELS[model_id])

@router.patch("/{model_id}", response_model=ModelResponse)
async def update_model(model_id: str, model_update: ModelUpdate):
    """
    Update an AI model's details.
    """
    if model_id not in MODELS:
        raise HTTPException(status_code=404, detail="Model not found")
    
    model_data = MODELS[model_id]
    
    # Update fields if provided
    update_data = model_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            model_data[key] = value
    
    MODELS[model_id] = model_data
    
    return ModelResponse(**model_data)

@router.delete("/{model_id}", response_model=dict)
async def delete_model(model_id: str):
    """
    Delete an AI model.
    """
    if model_id not in MODELS:
        raise HTTPException(status_code=404, detail="Model not found")
    
    del MODELS[model_id]
    
    return {"message": f"Model {model_id} deleted successfully"}

@router.post("/{model_id}/select", response_model=dict)
async def select_model_for_task(
    model_id: str,
    task_type: str,
    context_size: Optional[int] = None
):
    """
    Select a model for a specific task based on requirements.
    """
    if model_id not in MODELS:
        raise HTTPException(status_code=404, detail="Model not found")
    
    model = MODELS[model_id]
    
    # Check if model is active
    if not model["is_active"]:
        raise HTTPException(status_code=400, detail="Model is not active")
    
    # Check if context size is within model's limits
    if context_size and context_size > model["context_window"]:
        raise HTTPException(
            status_code=400, 
            detail=f"Context size {context_size} exceeds model's context window {model['context_window']}"
        )
    
    # In a real implementation, we would check if the model has the required capabilities for the task
    
    return {
        "message": f"Model {model_id} selected for task",
        "model": ModelResponse(**model),
        "estimated_cost": {
            "prompt_tokens": 0,  # Would be calculated based on task
            "completion_tokens": 0,  # Would be calculated based on task
            "total": 0  # Would be calculated based on task
        }
    }
