import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useRideStore } from '../store/rideStore';
import BookingForm from '../components/ride/BookingForm';
import RideOptionsList from '../components/ride/RideOptionsList';
import RideConfirmation from '../components/ride/RideConfirmation';
import RideTracking from '../components/ride/RideTracking';
import RideComplete from '../components/ride/RideComplete';
import RideCompleteSuccess from '../components/ride/RideCompleteSuccess';

const RidePage = () => {
  const location = useLocation();
  const { currentRide } = useRideStore();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<BookingForm />} />
          <Route path="options" element={<RideOptionsList />} />
          <Route path="confirm" element={<RideConfirmation />} />
          <Route 
            path="tracking" 
            element={currentRide ? <RideTracking /> : <Navigate to="/ride" replace />} 
          />
          <Route 
            path="complete" 
            element={currentRide ? <RideComplete /> : <Navigate to="/ride" replace />} 
          />
          <Route 
            path="complete/success" 
            element={<RideCompleteSuccess />} 
          />
          <Route path="*" element={<Navigate to="/ride" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default RidePage;
