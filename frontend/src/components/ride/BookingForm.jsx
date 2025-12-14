import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRideStore } from '../../store/rideStore';
import LocationSearch from '../common/LocationSearch';
import Button from '../common/Button';

const BookingForm = () => {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const navigate = useNavigate();
  const { searchRides } = useRideStore();

  const handleSearch = () => {
    if (pickup && drop) {
      searchRides(pickup, drop);
      navigate('/ride/options');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">Where to?</h2>
      <div className="space-y-2">
        <LocationSearch
          placeholder="Pickup location"
          onSelect={setPickup}
          value={pickup}
        />
        <LocationSearch
          placeholder="Drop location"
          onSelect={setDrop}
          value={drop}
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleSearch}
        disabled={!pickup || !drop}
      >
        Find Rides
      </Button>
    </div>
  );
};

export default BookingForm;
