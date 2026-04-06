import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
