import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { frameFiles } from '../frames'

interface CanvasBackgroundProps {
    frameCount: number
    frameUrlTemplate: string
    onLoadComplete: () => void
    currentVariantId: string
}

export default function CanvasBackground({
    frameCount,
    frameUrlTemplate,
    onLoadComplete,
    currentVariantId
}: CanvasBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { scrollYProgress } = useScroll()

    // Preload images whenever the variant or template changes
    useEffect(() => {
        setIsLoading(true)
        let loadedCount = 0
        const loadedImages: HTMLImageElement[] = []

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            // If template is the special local one, resolve from imported list
            if (frameUrlTemplate === '/assets/soda/{index}') {
                img.src = `/assets/soda/${frameFiles[i]}`
            } else {
                const indexStr = (i + 1).toString().padStart(4, '0')
                img.src = frameUrlTemplate.replace('{index}', indexStr)
            }

            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                    setIsLoading(false)
                    onLoadComplete()
                }
            }
            img.onerror = (e) => {
                console.error(`Failed to load frame ${i}:`, img.src, e)
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                    setIsLoading(false)
                    onLoadComplete()
                }
            }
            loadedImages.push(img)
        }
    }, [frameCount, frameUrlTemplate, currentVariantId, onLoadComplete])

    // Map scroll progress (0..1) to frame index (0..frameCount-1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

    const renderFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0 || isLoading) return
        const context = canvasRef.current.getContext('2d')
        if (!context) return

        let activeIndex = Math.floor(index)
        activeIndex = Math.max(0, Math.min(activeIndex, images.length - 1))

        const img = images[activeIndex]
        if (img) {
            // Draw image covering the whole canvas using object-fit: cover semantics
            const canvas = canvasRef.current
            const canvasRatio = canvas.width / canvas.height
            const imgRatio = img.width / img.height

            let renderWidth, renderHeight, x, y
            if (canvasRatio > imgRatio) {
                renderWidth = canvas.width
                renderHeight = canvas.width / imgRatio
                x = 0
                y = (canvas.height - renderHeight) / 2
            } else {
                renderWidth = canvas.height * imgRatio
                renderHeight = canvas.height
                x = (canvas.width - renderWidth) / 2
                y = 0
            }
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(img, x, y, renderWidth, renderHeight)
        }
    }

    // Handle resizing canvas to match window
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
                renderFrame(frameIndex.get())
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize() // Initialize
        return () => window.removeEventListener('resize', handleResize)
    }, [images, isLoading])

    // Update canvas when scroll changes
    useMotionValueEvent(frameIndex, 'change', (latest) => {
        renderFrame(latest)
    })

    // Initial draw once loaded
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            // Need a tiny delay to ensure canvas exists in DOM after isLoading turns false
            requestAnimationFrame(() => {
                renderFrame(frameIndex.get())
            })
        }
    }, [isLoading, images])

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: isLoading ? 0 : 1 }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>
    )
}
