import { motion } from 'framer-motion';

const Input = ({
  label,
  error,
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500">
            {icon}
          </div>
        )}
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          whileFocus={{ scale: 1.01 }}
          className={`input-field ${icon ? 'pl-12' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
