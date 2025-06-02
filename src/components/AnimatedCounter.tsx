'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
}

export default function AnimatedCounter({ from, to, duration = 2, suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })

    const controls = animate(count, to, { duration })

    return () => {
      unsubscribe()
      controls.stop()
    }
  }, [count, to, duration, rounded])

  return (
    <span className="font-bold text-2xl text-primary-600">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}