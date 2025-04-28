import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faParking, faCog, faSignOutAlt, faUnlink, faLink, faSyncAlt, 
  faTimes, faCar, faTicketAlt, faChartLine, faMapMarkedAlt 
} from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [lastCheckedTime, setLastCheckedTime] = useState<string>('');
  const navigate = useNavigate();

  const toggleConnection = () => {
    setConnected(!connected);
    
    // Update timestamp
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setLastCheckedTime(timeString);
  };

  const navigateToImageViewer = () => {
    navigate('/imageviewer');
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <FontAwesomeIcon icon={faParking} className="logo-icon" />
              <h1>ParkMaster Pro</h1>
            </div>
            <div className="user-controls">
              <span>Welcome, Admin</span>
              <button><FontAwesomeIcon icon={faCog} /> Settings</button>
              <button><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container">
        <section className="welcome-section">
          <h2>Welcome to ParkMaster Pro</h2>
          <p>Your complete solution for efficient parking space management and monitoring</p>
        </section>
        
        <section className="status-container">
          <h3 className="status-heading">System Communication Status</h3>
          <div className={`status-box ${connected ? 'status-connected' : 'status-disconnected'}`}>
            <div className="status-icon">
              <FontAwesomeIcon icon={connected ? faLink : faUnlink} />
            </div>
            <div>{connected ? 'CONNECTED' : 'DISCONNECTED'}</div>
            <div className="timestamp">
              Last checked: <span>{lastCheckedTime || 'Not checked yet'}</span>
            </div>
          </div>
          <button onClick={toggleConnection} className="connect-btn">
            <FontAwesomeIcon icon={connected ? faTimes : faSyncAlt} />{' '}
            {connected ? 'Disconnect Serial Port' : 'Connect Serial Port'}
          </button>
        </section>
        
        <section className="quick-actions">
          <div className="action-card">
            <FontAwesomeIcon icon={faCar} className="action-icon" />
            <h3>Manage Vehicles</h3>
            <p>Register new vehicles or update existing records</p>
          </div>
          <div className="action-card">
            <FontAwesomeIcon icon={faTicketAlt} className="action-icon" />
            <h3>Parking Tickets</h3>
            <p>Issue and manage parking tickets</p>
          </div>
          <div className="action-card" onClick={navigateToImageViewer}>
            <FontAwesomeIcon icon={faChartLine} className="action-icon" />
            <h3>Reports</h3>
            <p>Generate and view occupancy and revenue reports</p>
          </div>
          <div className="action-card">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="action-icon" />
            <h3>Parking Map</h3>
            <p>View real-time parking space availability</p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ParkMaster Pro. All rights reserved.</p>
        </div>
      </footer>
      
      {/* CSS Styles */}
      <style>{`
        .home-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f7fc;
          color: #333;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
        }
        
        header {
          background-color: #2c3e50;
          color: white;
          padding: 20px 0;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          width: 100%;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          font-size: 2.5rem;
          margin-right: 10px;
        }
        
        h1 {
          margin: 0;
          font-weight: 500;
          font-size: 1.8rem;
        }
        
        .user-controls {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .user-controls button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
          font-size: 0.9rem;
        }
        
        .user-controls button:hover {
          background-color: #2980b9;
        }
        
        .welcome-section {
          text-align: center;
          margin: 40px 0;
          width: 100%;
        }
        
        .welcome-section h2 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }
        
        .welcome-section p {
          font-size: 1.1rem;
          color: #7f8c8d;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .status-container {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          padding: 25px;
          margin: 30px 0;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }
        
        .status-heading {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        
        .status-box {
          padding: 30px;
          border-radius: 8px;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        
        .status-connected {
          background-color: #e8f5e9;
          color: #2e7d32;
          border: 2px solid #a5d6a7;
        }
        
        .status-disconnected {
          background-color: #ffebee;
          color: #c62828;
          border: 2px solid #ef9a9a;
        }
        
        .status-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }
        
        .timestamp {
          font-size: 1rem; 
          font-weight: normal; 
          margin-top: 10px;
        }
        
        .connect-btn {
          background-color: #3498db; 
          color: white; 
          border: none; 
          padding: 12px 25px; 
          border-radius: 6px; 
          font-size: 1rem; 
          cursor: pointer;
        }
        
        .connect-btn:hover {
          background-color: #2980b9;
        }
        
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 40px;
          width: 100%;
        }
        
        .action-card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          text-align: center;
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        
        .action-card:hover {
          transform: translateY(-5px);
        }
        
        .action-icon {
          font-size: 2.5rem;
          color: #3498db;
          margin-bottom: 15px;
        }
        
        .action-card h3 {
          margin: 0 0 10px 0;
          color: #2c3e50;
        }
        
        .action-card p {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin: 0;
        }
        
        footer {
          margin-top: auto;
          width: 100%;
          text-align: center;
          padding: 20px;
          color: #7f8c8d;
          font-size: 0.9rem;
          background-color: #f4f7fc;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .user-controls {
            justify-content: center;
            margin-top: 10px;
          }
          
          .user-controls button {
            margin-left: 5px;
            margin-right: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
