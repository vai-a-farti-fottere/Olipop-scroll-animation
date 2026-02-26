import { motion, AnimatePresence } from 'framer-motion'
import type { DrinkVariant } from '../App'
import { Facebook, Instagram, Twitter } from 'lucide-react'

interface HeroSectionProps {
    variants: DrinkVariant[]
    activeIndex: number
    onPrevious: () => void
    onNext: () => void
}

export default function HeroSection({ variants, activeIndex, onPrevious, onNext }: HeroSectionProps) {
    const current = variants[activeIndex]

    return (
        <div className="relative w-full h-[250vh]">
            {/* 
        The space is 250vh to allow the user to scroll through the sequence faster.
        The content itself is sticky so it remains in the viewport.
      */}
            <div className="sticky top-0 w-full h-screen overflow-hidden text-white font-sans flex flex-col justify-between p-8 md:p-16">

                <div className="flex-1 flex items-center">
                    {/* Left Text Block */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center select-none z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none" style={{ color: current.themeColor }}>
                                    {current.name}
                                </h1>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest mt-2 mb-6">
                                    {current.subtitle}
                                </h2>
                                <p className="text-base md:text-lg font-normal mb-10 max-w-sm text-white/80 leading-relaxed">
                                    {current.description}
                                </p>

                                <div className="flex items-center space-x-4">
                                    <button
                                        className="px-8 py-4 rounded-full border border-white/30 backdrop-blur-md bg-white/10 text-white font-medium hover:bg-white/20 transition-colors uppercase tracking-wider text-sm"
                                    >
                                        Add to
                                    </button>
                                    <button
                                        className="px-8 py-4 rounded-full text-black font-semibold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        style={{ backgroundColor: current.mode === 'dark' ? '#fff' : current.themeColor }}
                                    >
                                        Cart
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Center Area (Empty) */}
                    <div className="hidden md:block w-1/3 h-full" />

                    {/* Right Side Variant Navigation */}
                    {variants.length > 1 && (
                        <div className="w-full md:w-1/3 flex justify-end items-center right-navigation z-10">
                            <div className="flex items-center">
                                <div className="flex flex-col items-center mr-8 space-y-4">
                                    <button
                                        onClick={onPrevious}
                                        className="group flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-white transition-colors mb-2">Prev</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-white transition-colors rotate-90">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div className="h-16 w-px bg-white/20" />

                                    <button
                                        onClick={onNext}
                                        className="group flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-white transition-colors rotate-90">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-white transition-colors mt-2">Next</span>
                                    </button>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="text-8xl md:text-9xl font-black tabular-nums tracking-tighter text-white/20 select-none"
                                    >
                                        {(activeIndex + 1).toString().padStart(2, '0')}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Socials */}
                <div className="flex justify-center w-full z-10 pb-4">
                    <div className="flex items-center space-x-6 text-white/50">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                    </div>
                </div>

            </div>
        </div>
    )
}
