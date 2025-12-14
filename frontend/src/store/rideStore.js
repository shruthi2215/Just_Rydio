import { create } from 'zustand';

const useRideStore = create((set, get) => ({
  // State
  pickup: null,
  drop: null,
  availableRides: [],
  selectedRide: null,
  currentRide: null,
  isLoading: false,
  error: null,

  // Actions
  setPickup: (pickup) => set({ pickup }),
  setDrop: (drop) => set({ drop }),

  searchRides: async (pickup, drop) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRides = [
        {
          id: 'uber_x',
          type: 'UberX',
          price: Math.floor(Math.random() * 100) + 100,
          eta: Math.floor(Math.random() * 10) + 5,
          distance: (Math.random() * 5 + 2).toFixed(1),
          baseFare: 40,
          distanceFare: Math.floor(Math.random() * 50) + 30,
          capacity: 4,
          provider: 'uber',
          vehicleType: 'Sedan',
          driverName: 'Rahul',
          vehicleNumber: 'KA 01 AB 1234',
          pickup,
          drop,
        },
        {
          id: 'uber_premium',
          type: 'Uber Premium',
          price: Math.floor(Math.random() * 150) + 150,
          eta: Math.floor(Math.random() * 8) + 3,
          distance: (Math.random() * 5 + 2).toFixed(1),
          baseFare: 60,
          distanceFare: Math.floor(Math.random() * 70) + 40,
          capacity: 4,
          provider: 'uber',
          vehicleType: 'Premium Sedan',
          driverName: 'Vikram',
          vehicleNumber: 'KA 02 CD 5678',
          pickup,
          drop,
        },
      ];

      set({ 
        availableRides: mockRides,
        selectedRide: mockRides[0],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to search rides',
        isLoading: false 
      });
    }
  },

  selectRide: (ride) => set({ selectedRide: ride }),

  confirmRide: async () => {
    const { selectedRide } = get();
    if (!selectedRide) return;

    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        currentRide: {
          ...selectedRide,
          status: 'searching',
          driverLocation: null,
          startedAt: new Date().toISOString(),
        },
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to confirm ride',
        isLoading: false 
      });
    }
  },

  cancelRide: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ 
        currentRide: null,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to cancel ride',
        isLoading: false 
      });
    }
  },

  completeRide: async ({ rating, feedback }) => {
    const { currentRide } = get();
    if (!currentRide) return;

    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        currentRide: {
          ...currentRide,
          status: 'completed',
          rating,
          feedback,
          completedAt: new Date().toISOString(),
        },
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to complete ride',
        isLoading: false 
      });
    }
  },
}));

export default useRideStore;
