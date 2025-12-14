import { useRideStore } from '../../store/rideStore';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const RideOptionsList = () => {
  const { availableRides, selectRide, selectedRide } = useRideStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedRide) {
      navigate('/ride/confirm');
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Available Rides</h2>
      <div className="space-y-3 mb-4">
        {availableRides.map((ride) => (
          <div
            key={ride.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedRide?.id === ride.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectRide(ride)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{ride.type}</h3>
                <p className="text-sm text-gray-600">
                  {ride.eta} min • {ride.distance} km • {ride.capacity} people
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{ride.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleNext}
        disabled={!selectedRide}
      >
        Select {selectedRide?.type || 'Ride'}
      </Button>
    </div>
  );
};

export default RideOptionsList;
