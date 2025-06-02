'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail, Award, Sparkles, Wheat, Leaf } from 'lucide-react'

export default function ThankYouPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 relative overflow-hidden">
      {/* Background decoration with agricultural elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-30"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating agricultural icons */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-green-300 opacity-40"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Wheat size={30} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 text-green-400 opacity-35"
        animate={{
          y: [10, -10, 10],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Leaf size={25} />
      </motion.div>
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />
          
          {/* Success Icon with particles */}
          <motion.div 
            className="relative mb-8"
            variants={itemVariants}
          >
            <motion.div
              variants={iconVariants}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative"
            >
              <CheckCircle className="w-12 h-12 text-white" />
              
              {/* Sparkle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                    left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative z-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🎉 धन्यवाद! | Thank You!
              <br />
              <span className="text-3xl md:text-4xl text-primary-600">
                SoilConnect में आपका स्वागत है!
              </span>
              <br />
              <span className="text-2xl md:text-3xl text-blue-600">
                Welcome to SoilConnect!
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6 mb-10 relative z-10">
            <motion.div 
              className="bg-green-50 border border-green-200 rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg md:text-xl text-green-800 leading-relaxed mb-3">
                🌱 <span className="font-semibold">हिंदी में:</span> आपका पंजीकरण सफलतापूर्वक पूरा हो गया है! 
                हमें खुशी है कि आप हमारे <span className="font-bold text-green-700">मिट्टी परीक्षण नेटवर्क</span> में शामिल हुए हैं।
              </p>
              <p className="text-base text-green-700">
                हम उन किसानों और परीक्षण केंद्रों के समुदाय का हिस्सा बनने के लिए उत्साहित हैं जो 
                टिकाऊ कृषि भविष्य के लिए मिलकर काम कर रहे हैं।
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 border border-blue-200 rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg md:text-xl text-blue-800 leading-relaxed mb-3">
                🌾 <span className="font-semibold">In English:</span> Your registration has been successfully completed! 
                We're excited to have you join our community of farmers and testing centers working 
                together for a <span className="font-bold text-blue-700">sustainable agricultural future</span>.
              </p>
              <p className="text-base text-blue-700">
                Our platform will help you access the best soil testing services and improve your crop yields 
                through data-driven agricultural practices.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">अगले चरण | Next Steps</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-yellow-700">
                  <span className="font-medium">हिंदी:</span> हमारी टीम आपके आवेदन की समीक्षा करेगी और जल्द ही आपके क्षेत्र में 
                  मिट्टी परीक्षण केंद्रों तक पहुंच के साथ आपसे संपर्क करेगी।
                </p>
                <p className="text-yellow-700">
                  <span className="font-medium">English:</span> Our team will review your application and get back to you soon with 
                  access to soil testing centers in your area and detailed information about available services.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="space-y-6 relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="group inline-flex items-center gradient-button text-white py-4 px-8 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🏠 होम पर वापस जाएं | Back to Home
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </motion.div>
            
            <motion.div 
              className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600"
              variants={itemVariants}
            >
              <motion.a 
                href="tel:+911234567890" 
                className="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Phone size={16} className="mr-2" />
                📞 +91 123 456 7890
              </motion.a>
              <motion.a 
                href="mailto:support@soilconnect.com" 
                className="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail size={16} className="mr-2" />
                ✉️ support@soilconnect.com
              </motion.a>
            </motion.div>

            <motion.div 
              className="text-center text-sm text-gray-500 space-y-1"
              variants={itemVariants}
            >
              <p>
                🤝 <span className="font-medium">सहायता:</span> मिट्टी परीक्षण के बारे में प्रश्न हैं?
              </p>
              <p>
                <span className="font-medium">Support:</span> Questions about soil testing? We're here to help!
              </p>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-6 right-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400 opacity-60" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-6 left-6"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-green-400 opacity-60" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}