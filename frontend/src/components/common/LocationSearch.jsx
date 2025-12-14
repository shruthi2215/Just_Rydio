import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const LocationSearch = ({ placeholder, onSelect, className = '', value = null }) => {
  const [inputValue, setInputValue] = useState(value ? value.address : '');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Mock function to simulate location search
  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock suggestions
    const mockSuggestions = [
      { id: 1, address: `${query} Road, City` },
      { id: 2, address: `${query} Street, Downtown` },
      { id: 3, address: `${query} Avenue, Suburb` },
    ];
    
    setSuggestions(mockSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchLocations(value);
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.address);
    onSelect && onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaMapMarkerAlt className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onMouseDown={() => handleSelect(suggestion)}
            >
              <FaSearch className="text-gray-400 mr-2" />
              <span>{suggestion.address}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
