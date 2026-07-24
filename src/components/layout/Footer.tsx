import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="space-y-6">
            <div className="relative inline-block bg-white rounded-lg p-2">
              <Image
                src="/aklogo.png"
                alt="Aakruti Digipress Logo"
                width={140}
                height={45}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium wedding albums, celebration photobooks and professional photo printing crafted with exceptional colour, detail and finish in Vijayawada.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-gold tracking-wide">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/albums?category=wedding" className="hover:text-white transition-colors">Telugu Wedding Albums</Link></li>
              <li><Link href="/albums?category=engagement" className="hover:text-white transition-colors">Engagement Albums</Link></li>
              <li><Link href="/albums?category=first-birthday" className="hover:text-white transition-colors">First Birthday</Link></li>
              <li><Link href="/albums?category=shashtipoorthi" className="hover:text-white transition-colors">Shashtipoorthi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-gold tracking-wide">Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/photo-printing" className="hover:text-white transition-colors">Professional Photo Printing</Link></li>
              <li><Link href="/for-photographers" className="hover:text-white transition-colors">For Photographers</Link></li>
              <li><Link href="/albums" className="hover:text-white transition-colors">Custom Album Covers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-gold tracking-wide">Studio Address</h4>
            <address className="not-italic text-sm text-gray-400 space-y-2 leading-relaxed">
              <p>28-10-9, Eluru Road,</p>
              <p>Masjid Street, Arundalpet,</p>
              <p>Governor Peta, Vijayawada,</p>
              <p>Andhra Pradesh 520002</p>
              <p className="pt-4">
                <a href="tel:+919177888499" className="hover:text-white transition-colors">+91 91778 88499</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aakruti Digipress Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
