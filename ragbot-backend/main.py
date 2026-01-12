from fastapi import FastAPI
from db.__init__ import init_db
from routes.users import router as users_router
from routes.chats import router as chats_router
from routes.query import router as query_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db()

app.include_router(users_router)
app.include_router(chats_router)
app.include_router(query_router)
