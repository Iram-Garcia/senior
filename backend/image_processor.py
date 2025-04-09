from PIL import Image
import io
from typing import Optional
import serial
import asyncio
from datetime import datetime

class ImageProcessor:
    def __init__(self):
        self.current_image_data = bytearray()
        self.is_receiving = False
        self._serial_port: Optional[serial.Serial] = None

    async def initialize_serial(self, port: str = "COM3", baudrate: int = 115200):
        """Initialize serial connection with ESP32"""
        try:
            self._serial_port = serial.Serial(port=port, baudrate=baudrate, timeout=1)
            return True
        except Exception as e:
            print(f"Error initializing serial port: {e}")
            return False

    async def process_serial_data(self, data: bytes) -> Optional[bytes]:
        """Process incoming serial data"""
        if b"START_IMAGE" in data:
            self.is_receiving = True
            self.current_image_data = bytearray()
            return None
        
        elif b"END_IMAGE" in data:
            self.is_receiving = False
            # Process the complete image
            try:
                image = Image.open(io.BytesIO(self.current_image_data))
                # Save with timestamp
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"images/image_{timestamp}.jpg"
                image.save(filename)
                return self.current_image_data
            except Exception as e:
                print(f"Error processing image: {e}")
                return None
        
        elif self.is_receiving:
            self.current_image_data.extend(data)
            return None

    def close_serial(self):
        """Close the serial connection"""
        if self._serial_port and self._serial_port.is_open:
            self._serial_port.close() 