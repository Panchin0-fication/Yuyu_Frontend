from fastapi import FastAPI
from routes.route import router
from fastapi.middleware.cors import CORSMiddleware
from my_secrets.handle_secrets import(settings)
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from config.limiter import limiter

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    settings.origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    
    allow_credentials=True,        
    allow_methods=["*"],           
    allow_headers=["*"],           
)

app.include_router(router)