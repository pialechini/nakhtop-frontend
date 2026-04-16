import nakhtopLogo from '@/assets/header.png';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between px-8 py-6">
        {/* Right */}
        <nav className="flex items-center gap-10 text-sm font-bold text-gray-700">
          <a href="#" className="flex items-center">
            <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-6 w-auto" />
          </a>
          <a href="#" className="hover:text-black">
            تماس با ما
          </a>
          <a href="#" className="hover:text-black">
            درباره ما
          </a>
          <a href="#" className="hover:text-black">
            ↗ فرصت‌های همکاری
          </a>
        </nav>

        {/* Left */}
        <div className="flex items-center gap-10 text-sm font-bold text-gray-700">
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

export default Layout;
