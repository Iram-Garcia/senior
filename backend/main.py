from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import os
from image_processor import ImageProcessor
from typing import List
import glob

app = FastAPI(title="Image Processing API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the images directory
app.mount("/images", StaticFiles(directory="images"), name="images")

# Initialize image processor
image_processor = ImageProcessor()

@app.get("/")
async def root():
    return {"message": "Image Processing API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/images/list")
async def list_images() -> List[str]:
    """Get a list of all processed images"""
    try:
        images = glob.glob("images/*.jpg")
        return [os.path.basename(image) for image in images]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/images/{image_name}")
async def get_image(image_name: str):
    """Get a specific image by name"""
    image_path = f"images/{image_name}"
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(image_path)

@app.post("/serial/connect")
async def connect_serial(port: str = "COM3", baudrate: int = 115200):
    """Connect to the serial port"""
    success = await image_processor.initialize_serial(port, baudrate)
    if success:
        return {"message": "Successfully connected to serial port"}
    raise HTTPException(status_code=500, detail="Failed to connect to serial port")

@app.post("/serial/disconnect")
async def disconnect_serial():
    """Disconnect from the serial port"""
    image_processor.close_serial()
    return {"message": "Disconnected from serial port"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 