from fastapi import FastAPI
import ffmpeg

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process")
def process_video(url: str):
    # Placeholder for ffmpeg processing
    return {"status": "processing", "url": url}
