import { useEffect, useState } from 'react';
import { useRideStore } from '../../store/rideStore';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const RideTracking = () => {
  const { currentRide, cancelRide } = useRideStore();
  const [driverLocation, setDriverLocation] = useState(null);
  const [timeToArrival, setTimeToArrival] = useState('3-5');
  const navigate = useNavigate();

  // Simulate driver location updates
  useEffect(() => {
    if (!currentRide) {
      navigate('/ride');
      return;
    }

    // Initial driver location near pickup point
    const initialLocation = {
      lat: currentRide.pickup.lat + 0.01,
      lng: currentRide.pickup.lng + 0.01,
    };
    setDriverLocation(initialLocation);

    // Simulate driver moving towards pickup
    const moveInterval = setInterval(() => {
      setDriverLocation(prev => {
        if (!prev) return initialLocation;
        
        // Move towards pickup point
        const latDiff = currentRide.pickup.lat - prev.lat;
        const lngDiff = currentRide.pickup.lng - prev.lng;
        
        // If very close to pickup, stop moving
        if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
          clearInterval(moveInterval);
          return { lat: currentRide.pickup.lat, lng: currentRide.pickup.lng };
        }
        
        // Move a small step towards pickup
        return {
          lat: prev.lat + latDiff * 0.1,
          lng: prev.lng + lngDiff * 0.1,
        };
      });
      
      // Update ETA
      setTimeToArrival(prev => {
        const [min, max] = prev.split('-').map(Number);
        if (min <= 1) return '1-2';
        return `${min - 1}-${max - 1}`;
      });
    }, 5000);

    return () => clearInterval(moveInterval);
  }, [currentRide, navigate]);

  const handleCancel = async () => {
    await cancelRide();
    navigate('/ride');
  };

  if (!currentRide) {
    navigate('/ride');
    return null;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Map Placeholder */}
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Map View</p>
            {driverLocation && (
              <div 
                className="absolute w-4 h-4 bg-blue-500 rounded-full -ml-2 -mt-2"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${
                    ((driverLocation.lng - currentRide.pickup.lng) * 1000)
                  }%, ${
                    ((driverLocation.lat - currentRide.pickup.lat) * 1000)
                  }%)`,
                }}
              ></div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Your Ride is Coming</h2>
              <p className="text-gray-600">
                {currentRide.driverName} is on the way
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl">🚗</div>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600">A</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Picking up at</p>
                <p className="font-medium">{currentRide.pickup.address}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600">B</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dropping at</p>
                <p className="font-medium">{currentRide.drop.address}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-center text-blue-800 font-medium">
              Driver arriving in {timeToArrival} minutes
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(1 - parseInt(timeToArrival) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => window.alert('Calling driver...')}
            >
              Call Driver
            </Button>
            <Button 
              variant="danger" 
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel Ride
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideTracking;
