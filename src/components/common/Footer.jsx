import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    Resources: [
      { name: 'Facilities', path: '/explore' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'API Docs', path: '/docs' },
      { name: 'Community', path: '/community' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-dark-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                SportHub
              </span>
            </Link>
            <p className="text-dark-400 mb-6 max-w-sm">
              Your premier destination for booking sports facilities. Find, book, and play at the best venues in your area.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-dark-400">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>contact@sporthub.com</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>123 Sport Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © {currentYear} SportHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-primary-500 text-dark-400 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
