import { useState, useCallback, useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import HeroSection from './components/HeroSection'
import CanvasBackground from './components/CanvasBackground'
import { frameFiles } from './frames'

export interface DrinkVariant {
  id: string
  name: string
  subtitle: string
  description: string
  themeColor: string
  mode: 'light' | 'dark'
  frameCount: number
  frameUrlTemplate: string
}

export const variants: DrinkVariant[] = [
  {
    id: 'cherry',
    name: 'CHERRY',
    subtitle: 'COLA',
    description: 'A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.',
    themeColor: '#FF3366',
    mode: 'dark',
    frameCount: frameFiles.length,
    frameUrlTemplate: '/assets/soda/{index}'
  }
]

export default function App() {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const currentVariant = variants[activeVariantIndex]

  // Set the theme class on document
  useEffect(() => {
    document.documentElement.className = themeMode
  }, [themeMode])

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleToggleTheme = useCallback(() => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const handlePrevious = useCallback(() => {
    setActiveVariantIndex(prev => (prev === 0 ? variants.length - 1 : prev - 1))
    setIsLoading(true)
    setLoadingProgress(0)
  }, [])

  const handleNext = useCallback(() => {
    setActiveVariantIndex(prev => (prev === variants.length - 1 ? 0 : prev + 1))
    setIsLoading(true)
    setLoadingProgress(0)
  }, [])

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Simulate progress until load completes
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(p => {
          if (p >= 99) {
            clearInterval(interval)
            return 99
          }
          return p + 1
        })
      }, 50)
      return () => clearInterval(interval)
    } else {
      setLoadingProgress(100)
    }
  }, [isLoading])

  return (
    <div className={`relative min-h-screen text-foreground transition-colors duration-500`}>
      <Preloader
        isLoading={isLoading}
        progress={loadingProgress}
        currentVariant={currentVariant}
      />

      <Navbar
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />

      <CanvasBackground
        frameCount={currentVariant.frameCount}
        frameUrlTemplate={currentVariant.frameUrlTemplate}
        onLoadComplete={handleLoadComplete}
        currentVariantId={currentVariant.id}
      />

      <HeroSection
        variants={variants}
        activeIndex={activeVariantIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Placeholder content below the fold to allow scrolling */}
      <div className="relative z-10 bg-background pt-20">
        <section id="product" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">Product Overview</h2>
          <p className="text-xl max-w-3xl leading-relaxed text-muted-foreground">
            Olipop is a new kind of soda. We combined prebiotics, plant fiber, and botanicals to create a sweet-tasting, healthy soda that supports digestive health.
          </p>
        </section>

        <section id="ingredients" className="py-24 px-8 md:px-16 bg-muted max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">Ingredients & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-background rounded-2xl">
              <h3 className="text-xl font-bold uppercase mb-4">Cassava Root</h3>
              <p className="text-muted-foreground">A good source of prebiotic fiber that feeds good gut bacteria.</p>
            </div>
            <div className="p-8 bg-background rounded-2xl">
              <h3 className="text-xl font-bold uppercase mb-4">Chicory Root</h3>
              <p className="text-muted-foreground">Aids in digestion and helps lower blood sugar.</p>
            </div>
            <div className="p-8 bg-background rounded-2xl">
              <h3 className="text-xl font-bold uppercase mb-4">Nopal Cactus</h3>
              <p className="text-muted-foreground">Packed with antioxidants, vitamins, and minerals.</p>
            </div>
          </div>
        </section>

        <section id="nutrition" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">Nutrition Facts</h2>
          <div className="border-4 border-foreground p-8 max-w-md bg-white text-black font-sans">
            <h3 className="text-5xl font-black border-b-8 border-black pb-2 mb-2">Nutrition Facts</h3>
            <p className="font-bold border-b-[1px] border-black pb-1">1 serving per container</p>
            <div className="flex justify-between items-end border-b-8 border-black py-2 mb-2">
              <span className="font-bold text-lg">Serving size</span>
              <span className="font-bold text-lg">1 Can (355mL)</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-bold text-sm">Amount per serving</span>
            </div>
            <div className="flex justify-between items-end border-b-4 border-black pb-1 mb-2">
              <span className="font-black text-4xl">Calories</span>
              <span className="font-black text-4xl">45</span>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-24 px-8 md:px-16 bg-muted max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">Social Proof</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 bg-background rounded-2xl flex flex-col items-center text-center">
                <div className="flex space-x-1 text-yellow-400 mb-6">
                  ★★★★★
                </div>
                <p className="font-medium text-lg leading-relaxed mb-6">"This is the best tasting healthy soda I've ever had. I highly recommend the {currentVariant.name} flavor!"</p>
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">- Happy Customer</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-black text-white py-16 px-8 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-8 mt-12">
            <div className="text-2xl font-black tracking-tighter uppercase mb-8 md:mb-0">
              Olipop
            </div>
            <div className="flex space-x-8 text-sm uppercase tracking-widest font-medium text-white/50">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <div className="mt-8 md:mt-0 text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Olipop Inc.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
