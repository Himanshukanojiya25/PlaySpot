import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-50 mb-2">
          Welcome Back
        </h2>
        <p className="text-dark-600 dark:text-dark-400">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400"
          >
            {errors.general}
          </motion.div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-dark-600 dark:text-dark-400">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Sign In
        </Button>

        <p className="text-center text-dark-600 dark:text-dark-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;
