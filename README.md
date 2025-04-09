# 📸 ESP32 Image Processing App

A full-stack application that processes and displays images received from an ESP32 device through serial communication. Built with FastAPI and React.

## 🚀 Features

- **Real-time Image Processing**: Receive and process images from ESP32 via serial communication
- **Modern Web Interface**: Responsive design with real-time updates
- **Serial Communication**: Easy connection management with ESP32
- **Image Gallery**: Grid-based display of processed images
- **Error Handling**: Robust error management and user feedback

## 🛠️ Tech Stack

### Backend

- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework for building APIs
- [PySerial](https://pyserial.readthedocs.io/) - Serial communication
- [Pillow](https://python-pillow.org/) - Image processing
- [Uvicorn](https://www.uvicorn.org/) - ASGI server

### Frontend

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Axios](https://axios-http.com/) - HTTP client
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- ESP32 device (for image transmission)

## ⚙️ Installation

### Backend Setup

1. Create and activate a virtual environment:

   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # Unix/MacOS
   source venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd backend
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📝 API Documentation

### Available Endpoints

- `GET /health` - Check API health
- `GET /images/list` - Get list of processed images
- `GET /images/{image_name}` - Get specific image
- `POST /serial/connect` - Connect to serial port
- `POST /serial/disconnect` - Disconnect from serial port

## 🎯 Usage

1. Start both backend and frontend servers
2. Connect your ESP32 device to your computer
3. Click "Connect Serial" in the web interface
4. Images will be automatically processed and displayed as they are received
5. Use "Refresh Images" to update the gallery manually

## 📁 Project Structure

```bash
project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── image_processor.py   # Image processing logic
│   ├── requirements.txt     # Python dependencies
│   └── images/             # Processed images storage
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/      # API services
│   │   └── App.tsx        # Main application
│   ├── package.json
│   └── index.html
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 Troubleshooting

### Common Issues

1. **Serial Port Connection Failed**
   - Verify the ESP32 is properly connected
   - Check if the correct COM port is selected
   - Ensure no other application is using the port

2. **Images Not Displaying**
   - Verify the backend server is running
   - Check the browser console for errors
   - Ensure the image format is supported

## ✨ Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Image processing filters and effects
- [ ] User authentication
- [ ] Image metadata display
- [ ] Batch image processing
