import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col bg-black text-white'>
      <Navbar />
      <CartSidebar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
