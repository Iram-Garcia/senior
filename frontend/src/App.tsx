import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ImageViewer from './components/ImageViewer'
import Home from './components/home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imageviewer" element={<ImageViewer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App