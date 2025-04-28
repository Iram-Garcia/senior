import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ImageViewer: React.FC = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className="image-viewer-container" >
      <div className="back-button-container">
        <button className="back-button" onClick={goBackHome}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </button>
      </div>
      
      <h1>Image Viewer</h1>
      {/* Your image viewer content here */}
      
      <style>{`
        .image-viewer-container {
          padding: 0;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
        
        .back-button-container {
          margin-bottom: 20px;
          padding: 20px;
        }
        
        .back-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .back-button:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default ImageViewer;