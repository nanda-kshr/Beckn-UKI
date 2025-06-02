'use client'

import { motion } from 'framer-motion'
import { Wheat, Sprout, Sun, Droplets, Leaf, TreePine, Flower, Gem } from 'lucide-react'

export default function AgriFloatingElements() {
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const delayedVariants = {
    animate: {
      y: [20, -20, 20],
      rotate: [5, -5, 5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wheat - Top Left */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 text-yellow-200 opacity-40"
      >
        <Wheat size={45} />
      </motion.div>
      
      {/* Sprout - Top Right */}
      <motion.div
        variants={delayedVariants}
        animate="animate"
        className="absolute top-1/3 right-20 text-green-300 opacity-50"
      >
        <Sprout size={38} />
      </motion.div>
      
      {/* Sun - Center Left */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute top-1/2 left-1/4 text-yellow-300 opacity-35"
      >
        <Sun size={50} />
      </motion.div>
      
      {/* Droplets - Bottom Right */}
      <motion.div
        variants={delayedVariants}
        animate="animate"
        className="absolute bottom-1/3 right-1/3 text-blue-300 opacity-40"
      >
        <Droplets size={42} />
      </motion.div>
      
      {/* Leaf - Top Center */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-1/2 text-green-200 opacity-30"
      >
        <Leaf size={35} />
      </motion.div>
      
      {/* Tree - Bottom Left */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute bottom-1/4 left-20 text-green-400 opacity-25"
      >
        <TreePine size={40} />
      </motion.div>
      
      {/* Flower - Center Right */}
      <motion.div
        variants={delayedVariants}
        animate="animate"
        className="absolute top-2/3 right-10 text-pink-200 opacity-35"
      >
        <Flower size={32} />
      </motion.div>
      
      {/* Soil Particles - Multiple small gems */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-1/2 left-1/3 text-amber-300 opacity-30"
      >
        <Gem size={25} />
      </motion.div>
      
      <motion.div
        variants={delayedVariants}
        animate="animate"
        className="absolute top-3/4 right-1/4 text-amber-400 opacity-25"
      >
        <Gem size={20} />
      </motion.div>
    </div>
  )
}