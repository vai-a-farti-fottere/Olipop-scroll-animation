# Olipop - Interactive Brand Landing Page

An interactive, scrollytelling landing page built for Olipop, featuring canvas-based scroll animations, smooth scrolling, and dynamic interactions. This project showcases a high-performance image sequence animation controlled by user scroll position, delivering a modern and engaging brand experience.

## ✨ Features

- **🖼️ Canvas Scroll Animation**: A high-performance, 190-frame image sequence that Scrubs back and forth flawlessly tied to the scroll position using HTML5 `<canvas>`.
- **🎢 Smooth Scrolling**: Integrated with [Lenis](https://lenis.darkroom.engineering/) for a fluid, natural, and premium scrolling experience.
- **🌗 Theming**: Dynamic dark/light mode switching tied to different soda variants and brand colors.
- **💫 Component Animations**: UI elements animate in and out smoothly using [Framer Motion](https://www.framer.com/motion/).
- **📱 Responsive Design**: Fully responsive layout built with Tailwind CSS, ensuring the experience looks great on desktop, tablet, and mobile devices.
- **⚡ Fast Performance**: Built with Vite and React for lightning-fast hot module replacement (HMR) and optimized production builds.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

You will need Node.js installed on your machine.
#### For Windows
##### Download and install Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

##### Download and install Node.js:
choco install nodejs --version="25.7.0"

##### Verify the Node.js version:
node -v # Should print "v25.7.0".

##### Verify npm version:
npm -v # Should print "11.10.1".

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vai-a-farti-fottere/Olipop-scroll-animation.git
   ```

2. Navigate to the project directory:
   ```bash
   cd project
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## 📁 Project Structure

- `src/components/`: Contains all React components (Navbar, HeroSection, CanvasBackground, etc.)
- `src/App.tsx`: The main application orchestrator and layout container.
- `public/assets/soda/`: Contains the 190-frame image sequence (`.webp`) used for the canvas animation.
- `src/frames.ts`: Helper file managing the array of frame filenames.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
