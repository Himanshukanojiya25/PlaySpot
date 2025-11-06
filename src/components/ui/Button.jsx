import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/50',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white hover:shadow-lg hover:shadow-secondary-500/50',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white hover:shadow-lg hover:shadow-accent-500/50',
    ghost: 'bg-transparent hover:bg-dark-100 dark:hover:bg-dark-800 text-dark-900 dark:text-dark-50 border border-dark-200 dark:border-dark-700',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </motion.button>
  );
};

export default Button;
