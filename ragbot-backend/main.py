from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from query_data import query_rag

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def query_endpoint(request: QueryRequest):
    try:
        result = query_rag(request.query)
        return result, HTTPException(status_code=200, detail="The answer was fetched successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
