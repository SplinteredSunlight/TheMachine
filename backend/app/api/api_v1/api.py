from fastapi import APIRouter

from app.api.api_v1.endpoints import tasks, models, agents, orchestration

api_router = APIRouter()

api_router.include_router(
    tasks.router,
    prefix="/tasks",
    tags=["tasks"]
)

api_router.include_router(
    models.router,
    prefix="/models",
    tags=["models"]
)

api_router.include_router(
    agents.router,
    prefix="/agents",
    tags=["agents"]
)

api_router.include_router(
    orchestration.router,
    prefix="/orchestration",
    tags=["orchestration"]
)
