import { motion } from 'framer-motion';
import SignupForm from '../../components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-dark relative overflow-hidden py-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-strong p-8 rounded-2xl shadow-2xl">
            <SignupForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
