import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleBookRide = () => {
    navigate('/ride');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Rydio</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Ride with</span>
                  <span className="block text-blue-200">comfort & safety</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Book a ride in seconds. Enjoy reliable and affordable transportation at your fingertips.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button
                      onClick={handleBookRide}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                    >
                      Book a ride
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Happy passenger in a car"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to travel
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Experience the convenience of modern transportation with our reliable service.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Fast Booking',
                  description: 'Book a ride in just a few taps and get matched with a driver in seconds.',
                  icon: '🚕',
                },
                {
                  name: 'Affordable Rides',
                  description: 'Competitive pricing with no surge pricing during peak hours.',
                  icon: '💰',
                },
                {
                  name: '24/7 Support',
                  description: 'Our support team is available around the clock to assist you.',
                  icon: '🛡️',
                },
                {
                  name: 'Safe & Secure',
                  description: 'All drivers are verified and rides are tracked in real-time for your safety.',
                  icon: '🔒',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to ride?</span>
            <span className="block">Book your first ride today.</span>
          </h2>
          <Button
            onClick={handleBookRide}
            className="mt-8 w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
          >
            Get started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Rydio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
