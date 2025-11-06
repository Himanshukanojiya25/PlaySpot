import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    const { confirmPassword, ...signupData } = formData;
    const result = await signup(signupData);
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
          Create Account
        </h2>
        <p className="text-dark-600 dark:text-dark-400">
          Join us to start booking facilities
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
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          icon={<User className="w-5 h-5" />}
          error={errors.name}
          required
        />

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

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.confirmPassword}
          required
        />

        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className="p-4 border-2 border-dark-200 dark:border-dark-700 rounded-xl cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                <p className="font-semibold text-center">User</p>
                <p className="text-xs text-dark-500 text-center mt-1">Book facilities</p>
              </div>
            </label>
            <label className="relative">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={formData.role === 'owner'}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className="p-4 border-2 border-dark-200 dark:border-dark-700 rounded-xl cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                <p className="font-semibold text-center">Owner</p>
                <p className="text-xs text-dark-500 text-center mt-1">Manage facilities</p>
              </div>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Create Account
        </Button>

        <p className="text-center text-dark-600 dark:text-dark-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default SignupForm;
