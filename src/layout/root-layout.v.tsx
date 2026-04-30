import { useState } from 'react'; // 1. Add useState
import nakhtopLogo from '@/assets/header.png';
import { Outlet } from 'react-router';
import Button from '@/components/ui/button';
import nakhtopSmileIcon from '@/assets/svgs/nakhtop-smile.svg';
import { cn } from '@/utils';
import { MenuSvg } from '@/components/svgs/menu.svg';
import { AnimatePresence, motion } from 'motion/react';

function MenuIcon({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button onClick={() => setIsMenuOpen((s) => !s)}>
      {isMenuOpen ? <MenuSvg color="white" /> : <MenuSvg color="black" />}
    </button>
  );
}

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header
        className={cn(
          'md:flex justify-between items-center px-6 py-8 md:px-8 md:py-6 relative',
          isMenuOpen ? 'bg-black' : 'flex'
        )}
      >
        {/* Mobile */}
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              key="menu-open"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* top bar */}
              <div className="flex justify-between items-center w-full">
                <MenuIcon {...{ isMenuOpen, setIsMenuOpen }} />

                <img
                  src={nakhtopSmileIcon}
                  alt="Nakhtop Smile Icon"
                  className="h-6 w-auto"
                />
              </div>

              {/* nav items with staggered animation */}
              <motion.div
                className="mt-15 flex flex-col gap-12 items-start font-iran font-bold text-2xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {[
                  'درباره ما',
                  'تماس با ما',
                  'نمایندگی',
                  '↗ فرصت‌های همکاری',
                ].map((text, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-white"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {text}
                  </motion.a>
                ))}
              </motion.div>

              {/* buttons with staggered animation */}
              <motion.div
                className="mt-80 flex items-center justify-center gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.4,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button className="py-4 px-6 font-iran font-medium bg-white rounded-lg text-black opacity-80">
                    پنل تولیدکنندگان
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button className="py-4 px-6 font-iran font-medium bg-white rounded-lg text-black opacity-80">
                    ورود به فروشگاه
                  </Button>
                </motion.div>
              </motion.div>

              {/* bars */}
              <motion.div
                className="flex absolute -bottom-2 left-0 w-full justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                style={{ originX: 0 }}
              >
                {['#001A23', '#FB5636', '#A1B868', '#B3B3B3', '#FFFFFF'].map(
                  (color) => (
                    <div
                      key={color}
                      className="w-10 h-2 flex-1"
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="menu-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="md:hidden flex justify-between items-center w-full"
            >
              <MenuIcon {...{ isMenuOpen, setIsMenuOpen }} />

              <Button className="md:hidden py-3 px-8">ورود</Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Widescreen Devices */}
        {/* Right */}
        <div className="flex gap-8">
          {/* LOGO */}
          <a href="#" className="hidden md:flex items-center">
            <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-6 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700">
            <a href="#" className="hover:text-black p-4">
              تماس با ما
            </a>
            <a href="#" className="hover:text-black p-4">
              درباره ما
            </a>
            <a href="#" className="hover:text-black p-4">
              ↗ فرصت‌های همکاری
            </a>
          </nav>
        </div>

        {/* Left */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-700">
          <a href="#" className="hover:text-black">
            تولیدکنندگان
          </a>
          <a
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-normal"
          >
            ورود به فروشگاه
          </a>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
