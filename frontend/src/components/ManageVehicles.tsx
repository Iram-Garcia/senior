import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { apiService } from '../services/api';

interface VehicleData {
  imageName: string;
  statusText: string;
  statusColor: 'green' | 'red';
  plate: string;
  studentId: string;
  email: string;
  name: string;
}

const InfoRow = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2 mb-1">
    <div className={`w-3 h-3 rounded-sm ${color}`} style={{ backgroundColor: color.includes('green') ? '#22c55e' : color.includes('red') ? '#ef4444' : '#000000' }} />
    <span>{label}</span>
  </div>
);

const VehicleCard = ({
  title,
  data,
}: {
  title: string;
  data: VehicleData | null;
}) => {
  if (!data) return <div className="flex-1 text-center p-4">No data available</div>;

  const imageUrl = apiService.getImageUrl(data.imageName);

  return (
    <div className="flex-1 px-4 min-w-[300px]">
      <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
      <img
        src={imageUrl}
        alt={`${title} Vehicle`}
        className="w-full max-h-64 object-contain border"
        onError={(e) => (e.currentTarget.src = '/images/no-vehicle.png')}
      />
      <div className="mt-4 text-sm">
        <InfoRow
          color={data.statusColor === 'green' ? 'bg-green-500' : 'bg-red-500'}
          label={data.statusText}
        />
        <InfoRow color="bg-green-500" label={`License Plate # - ${data.plate}`} />
        <InfoRow color="bg-black" label={`Student ID - ${data.studentId}`} />
        <InfoRow color="bg-black" label={`Email - ${data.email}`} />
        <InfoRow color="bg-black" label={`Name - ${data.name}`} />
      </div>
    </div>
  );
};

const ManageVehicles = () => {
  const [previous, setPrevious] = useState<VehicleData | null>(null);
  const [current, setCurrent] = useState<VehicleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [prev, curr] = await Promise.all([
          apiService.getPreviousVehicle(),
          apiService.getCurrentVehicle(),
        ]);
        setPrevious(prev);
        setCurrent(curr);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load vehicle data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header className="bg-gray-800 text-white w-full py-5 px-6 shadow-md" style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
          <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faParking} className="logo-icon" style={{ fontSize: '2.5rem', marginRight: '10px', color: '#ffffff' }} />
              <h1 style={{ margin: 0, fontWeight: 500, fontSize: '1.8rem', color: '#ffffff' }}>ParkMaster Pro</h1>
            </div>
            <div className="user-controls" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-2"
                style={{ backgroundColor: '#3498db', color: '#ffffff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px', fontSize: '0.9rem' }}
              >
                <FontAwesomeIcon icon={faCog} style={{ color: '#ffffff' }} /> Settings
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-2"
                style={{ backgroundColor: '#3498db', color: '#ffffff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px', fontSize: '0.9rem' }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#ffffff' }} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 text-center" style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center p-4">
            <svg
              className="animate-spin h-8 w-8 mx-auto text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: '#4f46e5' }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
            <p>Loading vehicles...</p>
          </div>
        )}

        {/* Vehicle Cards */}
        {!loading && (
          <div
            className="vehicle-container flex flex-col md:flex-row gap-4 p-6 bg-gray-200"
            style={{
              backgroundColor: '#e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px', // Gap for small screens (stacked)
              '@media (min-width: 768px)': {
                flexDirection: 'row',
                gap: '48px', // Increased gap for side-by-side layout
              },
            }}
          >
            <VehicleCard title="Previous" data={previous} />
            <VehicleCard title="Current" data={current} />
          </div>
        )}
      </main>

      {/* Inline Media Query for Layout */}
      <style>{`
        @media (min-width: 768px) {
          .vehicle-container {
            flex-direction: row !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageVehicles;