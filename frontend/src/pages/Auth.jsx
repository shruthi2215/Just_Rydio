import { useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/common/Button';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowOtp(true);
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!otp) return;
    
    setIsLoading(true);
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, any OTP works
    login({ phone, name: 'Demo User' });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to Rydio</h1>
        
        <form onSubmit={showOtp ? handleLogin : handleSendOtp} className="space-y-6">
          {!showOtp ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">We'll send you a verification code</p>
            </div>
          ) : (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Enter the 6-digit code sent to {phone}</p>
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full"
              isLoading={isLoading}
            >
              {showOtp ? 'Verify & Login' : 'Send OTP'}
            </Button>
          </div>
          
          {showOtp && (
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
            >
              Change phone number
            </button>
          )}
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

const Auth = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Routes>
  );
};

export default Auth;
