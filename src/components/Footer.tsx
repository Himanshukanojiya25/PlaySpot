import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer id="contact" className="bg-slate-950 border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                PlaySpot
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier destination for discovering and booking the best sports turfs and clubs. Find. Play. Connect.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/30"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Turfs', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-cyan-400" />
                <span>+91 9322663114</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-cyan-400" />
                <span>gunjanbagde001@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={18} className="text-cyan-400 mt-1" />
                <span>Near Ganesh Mandir, Nagpur, India</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} PlaySpot. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
