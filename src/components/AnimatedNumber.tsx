import React, { useState, useEffect, useRef } from 'react'

const AnimatedNumber = ({
  targetNumber,
  duration,
}: {
  targetNumber: number
  duration: number
}) => {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const animateNumber = () => {
    let startTime: number | null = null
    const end = targetNumber

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const progressRatio = Math.min(progress / (duration * 1000), 1)
      setCurrentNumber(Math.floor(progressRatio * end))

      if (progressRatio < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated) {
          animateNumber()
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasAnimated])

  return <span ref={ref}>{currentNumber.toLocaleString()}</span>
}

export default AnimatedNumber
