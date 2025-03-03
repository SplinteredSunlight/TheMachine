from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from enum import Enum
import uuid

router = APIRouter()

class AgentType(str, Enum):
    CODE = "code"
    DESIGN = "design"
    TEST = "test"
    SECURITY = "security"
    ANALYSIS = "analysis"
    CUSTOM = "custom"

class AgentCapability(str, Enum):
    CODE_GENERATION = "code_generation"
    CODE_REVIEW = "code_review"
    DESIGN_CREATION = "design_creation"
    TEST_GENERATION = "test_generation"
    SECURITY_ANALYSIS = "security_analysis"
    DATA_ANALYSIS = "data_analysis"
    DOCUMENTATION = "documentation"

class AgentCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    type: AgentType
    description: str = Field(..., min_length=1)
    capabilities: List[AgentCapability]
    default_model_id: str = Field(..., description="Default model to use")
    prompt_template: str = Field(..., description="Base prompt template for the agent")
    parameters: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None

class AgentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    capabilities: Optional[List[AgentCapability]] = None
    default_model_id: Optional[str] = None
    prompt_template: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None

class AgentResponse(BaseModel):
    id: str
    name: str
    type: AgentType
    description: str
    capabilities: List[AgentCapability]
    default_model_id: str
    prompt_template: str
    parameters: Dict[str, Any]
    metadata: Dict[str, Any]
    is_active: bool

# Mock data for development
AGENTS = {
    "code-agent": {
        "id": "code-agent",
        "name": "Code Generation Agent",
        "type": AgentType.CODE,
        "description": "Generates code based on requirements",
        "capabilities": [
            AgentCapability.CODE_GENERATION,
            AgentCapability.CODE_REVIEW,
            AgentCapability.DOCUMENTATION
        ],
        "default_model_id": "gpt-4o",
        "prompt_template": "You are an expert software developer. Your task is to: {{task}}",
        "parameters": {
            "temperature": 0.2,
            "max_tokens": 2000
        },
        "metadata": {},
        "is_active": True
    },
    "design-agent": {
        "id": "design-agent",
        "name": "Design Agent",
        "type": AgentType.DESIGN,
        "description": "Creates design artifacts and mockups",
        "capabilities": [
            AgentCapability.DESIGN_CREATION,
            AgentCapability.DOCUMENTATION
        ],
        "default_model_id": "gpt-4o",
        "prompt_template": "You are an expert designer. Your task is to: {{task}}",
        "parameters": {
            "temperature": 0.7,
            "max_tokens": 1500
        },
        "metadata": {},
        "is_active": True
    },
    "test-agent": {
        "id": "test-agent",
        "name": "Testing Agent",
        "type": AgentType.TEST,
        "description": "Generates and executes tests",
        "capabilities": [
            AgentCapability.TEST_GENERATION,
            AgentCapability.CODE_REVIEW
        ],
        "default_model_id": "gpt-4o-mini",
        "prompt_template": "You are an expert software tester. Your task is to: {{task}}",
        "parameters": {
            "temperature": 0.2,
            "max_tokens": 2000
        },
        "metadata": {},
        "is_active": True
    }
}

@router.post("/", response_model=AgentResponse)
async def create_agent(agent: AgentCreate):
    """
    Create a new agent.
    """
    agent_id = str(uuid.uuid4())
    
    agent_data = {
        "id": agent_id,
        "name": agent.name,
        "type": agent.type,
        "description": agent.description,
        "capabilities": agent.capabilities,
        "default_model_id": agent.default_model_id,
        "prompt_template": agent.prompt_template,
        "parameters": agent.parameters or {},
        "metadata": agent.metadata or {},
        "is_active": True
    }
    
    AGENTS[agent_id] = agent_data
    
    return AgentResponse(**agent_data)

@router.get("/", response_model=List[AgentResponse])
async def list_agents(
    type: Optional[AgentType] = None,
    capability: Optional[AgentCapability] = None,
    is_active: Optional[bool] = None,
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """
    List available agents with optional filtering.
    """
    filtered_agents = list(AGENTS.values())
    
    if type:
        filtered_agents = [agent for agent in filtered_agents if agent["type"] == type]
    
    if capability:
        filtered_agents = [agent for agent in filtered_agents if capability in agent["capabilities"]]
    
    if is_active is not None:
        filtered_agents = [agent for agent in filtered_agents if agent["is_active"] == is_active]
    
    # Sort by name
    filtered_agents.sort(key=lambda x: x["name"])
    
    # Apply pagination
    paginated_agents = filtered_agents[offset:offset + limit]
    
    return [AgentResponse(**agent) for agent in paginated_agents]

@router.get("/{agent_id}", response_model=AgentResponse)
async def get_agent(agent_id: str):
    """
    Get details of a specific agent.
    """
    if agent_id not in AGENTS:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return AgentResponse(**AGENTS[agent_id])

@router.patch("/{agent_id}", response_model=AgentResponse)
async def update_agent(agent_id: str, agent_update: AgentUpdate):
    """
    Update an agent's details.
    """
    if agent_id not in AGENTS:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent_data = AGENTS[agent_id]
    
    # Update fields if provided
    update_data = agent_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            agent_data[key] = value
    
    AGENTS[agent_id] = agent_data
    
    return AgentResponse(**agent_data)

@router.delete("/{agent_id}", response_model=dict)
async def delete_agent(agent_id: str):
    """
    Delete an agent.
    """
    if agent_id not in AGENTS:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    del AGENTS[agent_id]
    
    return {"message": f"Agent {agent_id} deleted successfully"}

@router.post("/{agent_id}/execute", response_model=dict)
async def execute_agent(
    agent_id: str,
    task: str,
    model_id: Optional[str] = None,
    parameters: Optional[Dict[str, Any]] = None
):
    """
    Execute an agent on a specific task.
    """
    if agent_id not in AGENTS:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = AGENTS[agent_id]
    
    # Check if agent is active
    if not agent["is_active"]:
        raise HTTPException(status_code=400, detail="Agent is not active")
    
    # Use provided model_id or default
    selected_model_id = model_id or agent["default_model_id"]
    
    # Merge provided parameters with agent defaults
    merged_parameters = {**agent["parameters"]}
    if parameters:
        merged_parameters.update(parameters)
    
    # In a real implementation, we would:
    # 1. Prepare the prompt using the agent's template
    # 2. Call the selected model with the prompt
    # 3. Process the response
    # 4. Return the result
    
    # For now, return a mock response
    return {
        "agent_id": agent_id,
        "task": task,
        "model_id": selected_model_id,
        "parameters": merged_parameters,
        "status": "completed",
        "result": f"Mock result for task: {task}",
        "cost": {
            "prompt_tokens": 100,
            "completion_tokens": 200,
            "total_cost": 0.005
        }
    }
