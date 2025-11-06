import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverable = false,
  glass = false,
  padding = 'normal',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
  };

  const glassClasses = glass
    ? 'glass'
    : 'bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700';

  const hoverClasses = hoverable
    ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]'
    : '';

  const classes = `${baseClasses} ${glassClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  if (hoverable) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
