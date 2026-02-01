import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

async function getTreatments() {
    return await directus.request(readItems('treatment'));
}

export default async function TedavilerPage() {
    const treatments = await getTreatments();

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-serif font-bold mb-10 text-center">Tüm Tedavilerimiz</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {treatments.map((t) => (
                    <Link key={t.id} href={`/tedaviler/${t.slug}`} className="group">
                        <div className="border hover:border-[var(--primary)] transition-all p-8 rounded-xl h-full shadow-sm hover:shadow-lg bg-white">
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-[var(--primary)]">{t.title}</h2>
                            <p className="text-gray-600 line-clamp-4 leading-relaxed">{t.summary}</p>
                            <div className="mt-6 text-[var(--primary)] font-medium group-hover:underline">Detaylı Bilgi →</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
