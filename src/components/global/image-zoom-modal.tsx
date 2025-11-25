"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  imageAlt: string
}

export function ImageZoomModal({ isOpen, onClose, imageUrl, imageAlt }: ImageZoomModalProps) {
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isZoomed, setIsZoomed] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">{imageAlt}</DialogTitle>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div
          className="relative w-full aspect-square overflow-hidden cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-75"
            style={
              isZoomed
                ? {
                    transform: `scale(3)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : { transform: "scale(1)" }
            }
          />

          {!isZoomed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <p className="text-white text-center">برای زوم کردن، ماوس را روی عکس ببرید</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
