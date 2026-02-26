import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

interface NavbarProps {
    themeMode: 'dark' | 'light'
    onToggleTheme: () => void
}

export default function Navbar({ themeMode, onToggleTheme }: NavbarProps) {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex items-center justify-between pointer-events-auto mix-blend-difference"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <div className="text-white text-2xl font-black tracking-tighter uppercase">
                <a href="#">Olipop</a>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-white/80">
                <a href="#product" className="hover:text-white transition-colors">Product</a>
                <a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a>
                <a href="#nutrition" className="hover:text-white transition-colors">Nutrition</a>
                <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="flex items-center space-x-6">
                <button
                    onClick={onToggleTheme}
                    className="text-white hover:text-white/80 transition-colors p-2"
                >
                    {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <a
                    href="#contact"
                    className="text-sm uppercase tracking-widest font-medium text-white hover:text-white/80 transition-colors hidden md:block"
                >
                    Contact
                </a>
            </div>
        </motion.nav>
    )
}
