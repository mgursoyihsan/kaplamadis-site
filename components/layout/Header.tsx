import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-serif font-bold text-[var(--primary)]">
                    Klinik<span className="text-[var(--secondary)]">Adı</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-[var(--secondary)] transition-colors">
                        Ana Sayfa
                    </Link>
                    <Link href="/tedaviler" className="text-sm font-medium hover:text-[var(--secondary)] transition-colors">
                        Tedaviler
                    </Link>
                    <Link href="/doktorlar" className="text-sm font-medium hover:text-[var(--secondary)] transition-colors">
                        Doktorlar
                    </Link>
                    <Link href="/iletisim" className="text-sm font-medium hover:text-[var(--secondary)] transition-colors">
                        İletişim
                    </Link>
                </nav>

                <Link
                    href="/randevu"
                    className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[var(--secondary)] rounded-full hover:bg-sky-600 transition-colors"
                >
                    Randevu Al
                </Link>

                {/* Mobile Menu Button Placeholder */}
                <button className="md:hidden p-2">
                    <span className="sr-only">Menü</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
        </header>
    );
}
