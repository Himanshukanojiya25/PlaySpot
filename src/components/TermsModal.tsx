import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Shield, AlertTriangle, CheckCircle, Clock, IndianRupee, Users, Calendar, Heart, Database, Scale } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  const termsSections = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Booking & Cancellation Policy",
      items: [
        "Bookings must be made at least 2 hours in advance",
        "Full refund available if cancelled 24+ hours before booking time",
        "50% refund for cancellations between 2-24 hours before booking",
        "No refund for cancellations within 2 hours of booking time",
        "Rain checks available for weather-related cancellations",
        "Membership bookings are non-refundable but transferable",
        "No-show will result in full booking charge"
      ]
    },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      title: "Payment & Pricing",
      items: [
        "All prices are inclusive of GST (18%)",
        "Payment must be completed to confirm booking",
        "Membership fees are non-refundable after 7 days",
        "Equipment rental charges are additional",
        "Security deposit of ₹500 may be required for equipment",
        "Dynamic pricing may apply during peak hours",
        "Members get 15% discount on equipment rental"
      ]
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Usage & Conduct",
      items: [
        "Minimum 4 people required for booking",
        "Maximum capacity must not be exceeded",
        "Proper sports attire must be worn at all times",
        "No alcohol, smoking, or narcotics on premises",
        "Respect other players and staff members",
        "Follow all safety guidelines and instructions",
        "Children under 12 must be accompanied by adults"
      ]
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Equipment & Facilities",
      items: [
        "Equipment damage charges will be applied at market rate",
        "Report any equipment issues immediately to staff",
        "Use facilities at your own risk",
        "Maintain cleanliness and hygiene standards",
        "Theft or vandalism will lead to legal action",
        "Personal equipment usage is allowed but at own risk",
        "Lost & found items kept for 30 days only"
      ]
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Liability & Safety",
      items: [
        "Sports involve inherent risks - play responsibly",
        "Management is not liable for personal injuries or accidents",
        "First aid kit available at reception area",
        "Emergency contact numbers displayed prominently",
        "Follow COVID-19 safety protocols if applicable",
        "Proper warm-up and stretching recommended",
        "Report any unsafe conditions immediately"
      ]
    },
    // NEW SECTIONS ADDED FOR COLLEGE PROJECT
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Membership Terms & Conditions",
      items: [
        "Membership validity starts from date of payment",
        "Membership is non-transferable without written consent",
        "Sessions cannot be carried forward to next month",
        "Priority booking for members only during peak hours",
        "Membership freeze available for medical reasons (max 30 days)",
        "Guest passes are subject to availability",
        "Membership cancellation requires 30 days written notice"
      ]
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Data Privacy & Security",
      items: [
        "We collect only necessary personal information",
        "Data is stored securely and not shared with third parties",
        "You may request data deletion at any time",
        "Payment information is encrypted and secure",
        "We use cookies for better user experience",
        "Marketing communications can be opted out",
        "Complaints can be emailed to privacy@sportsturf.com"
      ]
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: "Legal & Governing Terms",
      items: [
        "This agreement is governed by Indian laws",
        "All disputes subject to Nagpur jurisdiction",
        "We reserve right to modify terms with 7 days notice",
        "Continued use constitutes acceptance of modified terms",
        "Severability: If any clause is invalid, others remain effective",
        "Force majeure: Not liable for natural disasters, strikes, etc.",
        "Entire agreement: This supersedes all prior agreements"
      ]
    }
  ];

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 bg-slate-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
                  <p className="text-cyan-400 text-sm">Comprehensive Agreement - Please Read Carefully</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Important Notice */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-orange-400 font-bold text-lg mb-2">Legal Agreement Notice</h3>
                    <p className="text-orange-300 text-sm leading-relaxed">
                      This is a legally binding agreement between you and Sports Turf Booking Platform. 
                      By accepting these terms, you agree to all conditions mentioned below. 
                      Violation may result in booking cancellation without refund, permanent ban from facilities, 
                      and legal action where applicable. Please read all sections carefully.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Key Points Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-cyan-300">
                    <div className="font-semibold">💰 Payments</div>
                    <div>GST Included • Secure • Refund Policy</div>
                  </div>
                  <div className="text-green-300">
                    <div className="font-semibold">🛡️ Safety</div>
                    <div>Play Responsibly • First Aid • Insurance</div>
                  </div>
                  <div className="text-yellow-300">
                    <div className="font-semibold">📋 Membership</div>
                    <div>Non-refundable • Transferable • Benefits</div>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-6">
                {termsSections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                    className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-5"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{section.title}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Legal */}
              <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/10">
                <h4 className="text-white font-semibold mb-3">Complete Legal Agreement</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This agreement constitutes the complete and exclusive statement of the agreement between you and Sports Turf Booking Platform. 
                  It supersedes all proposals or prior agreements, verbal or written, and any other communications between the parties. 
                  Any modification to this agreement must be in writing and signed by both parties. All disputes shall be subject to 
                  the exclusive jurisdiction of the courts in Nagpur, Maharashtra, India.
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  <strong>Effective Date:</strong> January 15, 2024<br />
                  <strong>Last Updated:</strong> January 15, 2024<br />
                  <strong>Contact:</strong> legal@sportsturf.com
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-cyan-500/20 bg-slate-800/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>I Accept All Terms & Conditions</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-700 border border-cyan-500/30 rounded-lg text-white font-bold text-lg backdrop-blur-sm hover:bg-slate-600 transition-all"
                >
                  I Do Not Accept
                </motion.button>
              </div>
              
              <p className="text-gray-500 text-xs text-center mt-3">
                By accepting, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;