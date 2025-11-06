import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-strong p-8 rounded-2xl shadow-2xl">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
