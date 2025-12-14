import { useRideStore } from '../../store/rideStore';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const RideConfirmation = () => {
  const { selectedRide, confirmRide, isLoading } = useRideStore();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    await confirmRide();
    navigate('/ride/tracking');
  };

  if (!selectedRide) {
    navigate('/ride');
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirm Your Ride</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{selectedRide.type}</h3>
          <span className="text-lg font-bold">₹{selectedRide.price}</span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-start">
            <div className="w-6 flex-shrink-0 text-green-500">•</div>
            <div>
              <p className="font-medium text-gray-900">Pickup</p>
              <p>{selectedRide.pickup?.address || 'Select pickup location'}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 flex-shrink-0 text-red-500">•</div>
            <div>
              <p className="font-medium text-gray-900">Drop-off</p>
              <p>{selectedRide.drop?.address || 'Select drop location'}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between py-1">
            <span>Base Fare</span>
            <span>₹{selectedRide.baseFare}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Distance ({selectedRide.distance} km)</span>
            <span>₹{selectedRide.distanceFare}</span>
          </div>
          <div className="flex justify-between py-1 font-medium border-t border-gray-200 mt-2 pt-2">
            <span>Total</span>
            <span className="text-lg">₹{selectedRide.price}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full"
        onClick={handleConfirm}
        isLoading={isLoading}
      >
        Confirm & Book Ride
      </Button>
    </div>
  );
};

export default RideConfirmation;
