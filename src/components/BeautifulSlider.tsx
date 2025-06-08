// components/BeautifulSlider.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { id: 1, title: 'Slide One', image: '/images/1.webp' },
  { id: 2, title: 'Slide Two', image: '/images/2.jpg' },
 ]

export default function BeautifulSlider() {
  const [index, setIndex] = useState(0)

  const nextSlide = () => setIndex((index + 1) % slides.length)
  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length)

  return (
<div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-2xl aspect-[16/9] ">
      <div className="relative h-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={slides[index].id}
            src={slides[index].image}
            alt={slides[index].title}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0.5, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            
          />
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-xl">
          {slides[index].title}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <Button variant="ghost" size="icon" onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2">
        <Button variant="ghost" size="icon" onClick={nextSlide}>
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
