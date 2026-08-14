from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address

def get_user_id(request: Request):
    user = getattr(request.state, "user", None)
    return user.id if user else get_remote_address(request)

limiter = Limiter(key_func=get_user_id)

    