import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  isLoading = false,
  type = 'button',
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${disabled || isLoading ? disabledClasses : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
