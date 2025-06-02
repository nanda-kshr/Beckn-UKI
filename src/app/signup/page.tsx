'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { User, Phone, MapPin, ChevronDown, CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface FormData {
  name: string
  role: 'farmer' | 'buyer' | ''
  phone: string
  district: string
  state: string
}

// Separate component that uses useSearchParams
function SignupForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    phone: '',
    district: '',
    state: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState('')

  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam === 'farmer' || roleParam === 'buyer') {
      setFormData(prev => ({ ...prev, role: roleParam }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thank-you')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Something went wrong. Please try again. | कुछ गलत हुआ है। कृपया पुनः प्रयास करें।')
      }
    } catch (err) {
      setError('Network error. Please check your connection. | नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const getRoleDescription = () => {
    if (formData.role === 'farmer') {
      return {
        en: 'Get access to certified soil testing centers near you',
        hi: '🚜 अपने पास के प्रमाणित मिट्टी परीक्षण केंद्रों तक पहुंच प्राप्त करें'
      }
    } else if (formData.role === 'buyer') {
      return {
        en: 'Connect with farmers who need reliable soil testing services',
        hi: '🔬 उन किसानों से जुड़ें जिन्हें विश्वसनीय मिट्टी परीक्षण सेवाओं की आवश्यकता है'
      }
    }
    return {
      en: 'Start your journey with comprehensive soil analysis',
      hi: '🌾 व्यापक मिट्टी विश्लेषण के साथ अपनी यात्रा शुरू करें'
    }
  }

  const roleDesc = getRoleDescription()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block mb-6">
            <motion.h1 
              className="text-4xl font-bold text-primary-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SoilConnect
            </motion.h1>
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🤝 Join Our Network
            <br />
            <span className="text-xl text-primary-600">हमारे नेटवर्क में शामिल हों</span>
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              {roleDesc.en}
            </p>
            <p className="text-sm text-gray-500">
              {roleDesc.hi}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-transparent rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full -ml-12 -mb-12" />
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center"
              >
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Error | त्रुटि</p>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-primary-600" />
                Full Name | पूरा नाम *
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name | अपना पूरा नाम दर्ज करें"
                  required
                />
                {formData.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <ChevronDown className="w-4 h-4 mr-2 text-primary-600" />
                Role | भूमिका *
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  required
                >
                  <option value="">Select your role | अपनी भूमिका चुनें</option>
                  <option value="farmer">🚜 Farmer | किसान</option>
                  <option value="buyer">🔬 Buyer (Testing Center) | खरीदार (परीक्षण केंद्र)</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary-600" />
                Phone Number | फोन नंबर *
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter phone number | फोन नंबर दर्ज करें"
                  required
                />
                {formData.phone && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                  District | जिला *
                </label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('district')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="District | जिला"
                    required
                  />
                  {formData.district && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                  State | राज्य *
                </label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('state')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="State | राज्य"
                    required
                  />
                  {formData.state && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-button text-white py-4 px-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isSubmitting ? (
                  <motion.span 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader className="animate-spin mr-3 h-5 w-5" />
                    Registering... | पंजीकरण हो रहा है...
                  </motion.span>
                ) : (
                  '🌱 Join SoilConnect | SoilConnect में शामिल हों'
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              ← Back to Home | होम पर वापस जाएं
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Loading component for Suspense fallback
function SignupFormLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-6">SoilConnect</h1>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper
export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormLoading />}>
      <SignupForm />
    </Suspense>
  )
}