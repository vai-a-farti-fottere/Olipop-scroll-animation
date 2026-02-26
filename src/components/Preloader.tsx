import { motion, AnimatePresence } from 'framer-motion'
import type { DrinkVariant } from '../App'

interface PreloaderProps {
    isLoading: boolean
    progress: number // 0 to 100
    brandName?: string
    currentVariant?: DrinkVariant
}

export default function Preloader({ isLoading, progress, brandName = 'OLIPOP', currentVariant }: PreloaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                >
                    {/* Brand Logo / Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12"
                    >
                        {brandName}
                    </motion.h1>

                    <div className="w-64 md:w-96 max-w-[80vw]">
                        <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-3">
                            <span>Loading sequence</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            {/* Progress Bar Fill */}
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: currentVariant?.themeColor || '#fff' }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: 'linear', duration: 0.1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
