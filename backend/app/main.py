from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="A unified AI development and orchestration platform",
    version="0.1.0",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include API routers
from app.api.api_v1.api import api_router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.get("/")
async def root():
    return JSONResponse(
        content={
            "message": "Welcome to TheMachine API",
            "docs_url": "/docs",
            "version": "0.1.0"
        }
    )

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "healthy",
            "api_version": "0.1.0"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
