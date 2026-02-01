import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[var(--primary)] text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-serif font-bold text-white mb-4 block">
                            Klinik<span className="text-[var(--secondary)]">Adı</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Sağlıklı gülüşleriniz için en modern teknoloji ve uzman kadromuzla hizmetinizdeyiz.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                            <li><Link href="/tedaviler" className="hover:text-white transition-colors">Tedaviler</Link></li>
                            <li><Link href="/doktorlar" className="hover:text-white transition-colors">Doktorlar</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">İletişim</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>İstanbul, Türkiye</li>
                            <li>0 (212) 123 45 67</li>
                            <li>info@klinikadi.com</li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Çalışma Saatleri</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex justify-between"><span>Paz - Cum:</span> <span>09:00 - 19:00</span></li>
                            <li className="flex justify-between"><span>Cmt:</span> <span>09:00 - 14:00</span></li>
                            <li className="flex justify-between"><span>Pazar:</span> <span>Kapalı</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Tüm Hakları Saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
