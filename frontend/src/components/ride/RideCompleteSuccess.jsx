import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { FaCheckCircle } from 'react-icons/fa';

const RideCompleteSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-4xl text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your feedback has been submitted successfully. We appreciate you helping us improve our service.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/ride')}
          >
            Book Another Ride
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Redirecting to home page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default RideCompleteSuccess;
