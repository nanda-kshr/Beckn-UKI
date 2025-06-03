'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import AgriParticleBackground from '@/components/ParticleBackground'
import AgriFloatingElements from '@/components/FloatingElements'
import AnimatedCounter from '@/components/AnimatedCounter'
import { 
  Beaker, 
  Star, 
  TrendingUp, 
  Shield,
  Zap,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Leaf,
} from 'lucide-react'

export default function Home() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [processRef, processInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-screen gradient-bg text-white overflow-hidden">
        <AgriParticleBackground />
        <AgriFloatingElements />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div
            ref={heroRef}
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                SoilConnect
              </motion.h1>
              <motion.div
                className="w-24 h-1 bg-white mx-auto mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.p 
                className="text-lg md:text-xl opacity-80 mb-4"
                variants={itemVariants}
              >
                🌱 मिट्टी की जांच से बेहतर फसल | Smart Soil Testing for Better Harvest 🌾
              </motion.p>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              <span className="block mb-4 text-yellow-200">
                खुले कृषि नेटवर्क के माध्यम से किसानों, सेवा प्रदाताओं और कृषि विशेषज्ञों को जोड़ना
              </span>
              <span className="text-lg text-green-200">
                An open agriculture network connecting farmers, service providers, and agricultural experts through unified digital commerce protocols</span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/signup?role=farmer" 
                  className="group gradient-button text-white py-4 px-8 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[300px] inline-flex items-center justify-center"
                >
                  🚜 Join as Farmer | किसान के रूप में जुड़ें
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/signup?role=buyer" 
                  className="group gradient-button-blue text-white py-4 px-8 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[300px] inline-flex items-center justify-center"
                >
                  🔬 Join as Buyer | खरीदार के रूप में जुड़ें
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: Users, count: 15000, suffix: '+', label: 'खुश किसान', sublabel: 'Happy Farmers' },
                { icon: Award, count: 85, suffix: '+', label: 'परीक्षण केंद्र', sublabel: 'Testing Centers' },
                { icon: CheckCircle, count: 75000, suffix: '+', label: 'पूर्ण परीक्षण', sublabel: 'Tests Completed' },
                { icon: TrendingUp, count: 45, suffix: '%', label: 'उत्पादन वृद्धि', sublabel: 'Yield Increase' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-200" />
                  {statsInView && (
                    <div className="font-bold text-2xl text-white">
                      <AnimatedCounter from={0} to={stat.count} suffix={stat.suffix} />
                    </div>
                  )}
                  <p className="text-sm opacity-80 font-medium">{stat.label}</p>
                  <p className="text-xs opacity-60">{stat.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full opacity-75">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mx-auto mt-2"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </header>

      <main className="min-h-screen">
        {/* Introduction Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-50"
            animate={{
              background: [
                "linear-gradient(45deg, #f0f9f0, #e3f2fd)",
                "linear-gradient(135deg, #e8f5e8, #f0f9f0)",
                "linear-gradient(225deg, #f0f9f0, #e3f2fd)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-primary-600 mb-8"
              >
                🌾 Smart Soil Testing | स्मार्ट मिट्टी जांच
                <br />
                <span className="text-3xl md:text-4xl text-gray-700">Made Simple & Accessible</span>
              </motion.h2>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-6 text-lg md:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed"
              >
                <p className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <span className="font-semibold text-green-800">For Farmers:</span> Get access to a wide network of agricultural service providers including soil testing, crop advisory, equipment rental, and input suppliers through our open digital marketplace
                  <br /><br />
                  <span className="font-semibold text-green-700">किसानों के लिए:</span> हमारे खुले डिजिटल बाज़ार के माध्यम से मिट्टी परीक्षण, फसल सलाह, उपकरण किराया और इनपुट आपूर्तिकर्ताओं सहित कृषि सेवा प्रदाताओं के व्यापक नेटवर्क तक पहुंच प्राप्त करें
                </p>
                
                <p className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <span className="font-semibold text-blue-800">For Buyers/Testing Centers:</span> Join the open agriculture network and connect with farmers across regions. Offer your services - from soil testing to crop advisory, equipment rental to input supply - through standardized digital protocols
                  <br /><br />
                  <span className="font-semibold text-blue-700">खरीदारों/परीक्षण केंद्रों के लिए:</span> खुले कृषि नेटवर्क में शामिल हों और विभिन्न क्षेत्रों के किसानों से जुड़ें। मानकीकृत डिजिटल प्रोटोकॉल के माध्यम से अपनी सेवाएं प्रदान करें
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                🤝 Join Our Community | हमारे समुदाय में शामिल हों
              </h3>
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
                Whether you're a farmer seeking soil analysis or a buyer/testing center providing services,
                our platform connects the agricultural community for better crop outcomes.
                <br />
                <span className="text-primary-600 font-medium">चाहे आप मिट्टी विश्लेषण चाहने वाले किसान हों या सेवा प्रदान करने वाले खरीदार/परीक्षण केंद्र हों</span>
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/signup?role=farmer" 
                    className="group gradient-button text-white py-4 px-8 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[320px] inline-flex items-center justify-center"
                  >
                    <Phone className="mr-2" size={20} />
                    Join as Farmer | किसान के रूप में जुड़ें
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup?role=buyer"
                    className="group gradient-button-blue text-white py-4 px-8 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[320px] inline-flex items-center justify-center"
                  >
                    <Mail className="mr-2" size={20} />
                    Join as Buyer | खरीदार के रूप में जुड़ें
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Rest of the sections remain the same as previous version... */}
        {/* Services Section */}
        <section ref={servicesRef} className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                🔬 Available Soil Tests | उपलब्ध मिट्टी परीक्षण
              </motion.h3>
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg"
              >
                Comprehensive analysis for better crop planning | बेहतर फसल योजना के लिए व्यापक विश्लेषण
              </motion.p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Beaker,
                  title: "NPK Analysis",
                  subtitle: "NPK विश्लेषण",
                  description: "Primary nutrient testing for Nitrogen, Phosphorus, and Potassium levels",
                  descriptionHi: "नाइट्रोजन, फास्फोरस और पोटेशियम के स्तर की जांच",
                  color: "from-green-400 to-green-600"
                },
                {
                  icon: Zap,
                  title: "pH & EC Testing",
                  subtitle: "pH & EC परीक्षण",
                  description: "Electrical conductivity and pH level analysis for optimal growing conditions",
                  descriptionHi: "मिट्टी की अम्लता और विद्युत चालकता का मापन",
                  color: "from-blue-400 to-blue-600"
                },
                {
                  icon: Shield,
                  title: "Micronutrient Test",
                  subtitle: "सूक्ष्म पोषक तत्व",
                  description: "Analysis of Zinc, Boron, Copper, Iron, and other essential micronutrients",
                  descriptionHi: "जिंक, बोरान, कॉपर, आयरन और अन्य आवश्यक तत्व",
                  color: "from-purple-400 to-purple-600"
                },
                {
                  icon: Leaf,
                  title: "Organic Carbon",
                  subtitle: "कार्बनिक कार्बन",
                  description: "Organic matter content analysis for soil health assessment",
                  descriptionHi: "मिट्टी के स्वास्थ्य के लिए कार्बनिक पदार्थ की मात्रा",
                  color: "from-amber-400 to-amber-600"
                },
                {
                  icon: Star,
                  title: "Secondary Nutrients",
                  subtitle: "द्वितीयक पोषक तत्व",
                  description: "Calcium, Magnesium, and Sulfur analysis for complete nutrition profile",
                  descriptionHi: "कैल्शियम, मैग्नीशियम और सल्फर का विश्लेषण",
                  color: "from-red-400 to-red-600"
                },
                {
                  icon: Award,
                  title: "Detailed Reports",
                  subtitle: "विस्तृत रिपोर्ट",
                  description: "Comprehensive PDF reports with recommendations and treatment plans",
                  descriptionHi: "सिफारिशों और उपचार योजना के साथ PDF रिपोर्ट",
                  color: "from-indigo-400 to-indigo-600"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-sm text-primary-600 font-semibold mb-3">{service.subtitle}</p>
                  <div className="space-y-2">
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                    <p className="text-gray-500 leading-relaxed text-xs italic">{service.descriptionHi}</p>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary-600" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer remains the same... */}
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-2xl font-bold mb-4">SoilConnect</h4>
            <p className="text-gray-300 mb-6">
              Connecting farmers with soil testing centers | किसानों और मिट्टी परीक्षण केंद्रों को जोड़ना
              <br />
              <span className="text-sm">Smart solutions for sustainable agriculture | टिकाऊ कृषि के लिए स्मार्ट समाधान</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
              <motion.a 
                href="tel:+911234567890" 
                className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Phone size={18} className="mr-2" />
                📞 +91 123 456 7890
              </motion.a>
              <motion.a 
                href="mailto:support@soilconnect.com" 
                className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail size={18} className="mr-2" />
                ✉️ support@soilconnect.com
              </motion.a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 SoilConnect. Empowering farmers for sustainable agriculture | किसानों को सशक्त बनाना।
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}