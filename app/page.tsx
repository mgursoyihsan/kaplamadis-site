import directus, { getImageUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

async function getData() {
    try {
        const clinic = await directus.request(readSingleton('clinic'));
        const doctors = await directus.request(readItems('doctor'));
        const treatments = await directus.request(readItems('treatment', { limit: 3 }));
        const prices = await directus.request(readItems('treatment_price', { limit: 3 }));

        return {
            clinic,
            doctor: doctors?.[0],
            treatments: treatments || [],
            prices: prices || []
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { clinic: null, doctor: null, treatments: [], prices: [] };
    }
}

export default async function Home() {
    const { clinic, doctor, treatments, prices } = await getData();

    if (!clinic) return <div className="p-8 text-center mt-20">İçerik yüklenemedi. Lütfen CMS üzerinden 'Clinic' içeriğini giriniz.</div>;

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative text-center py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--primary)] mb-6">
                        {clinic.name}
                    </h1>
                    <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
                        {clinic.slogan || 'Modern teknoloji ve uzman kadromuz ile diş sağlığınız ve estetiğiniz için buradayız.'}
                    </p>
                    {clinic.hero_image && (
                        <div className="relative w-full h-[400px] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl mt-8 bg-gray-200">
                            <Image
                                src={getImageUrl(clinic.hero_image) || ''}
                                alt="Klinik"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Doctor Section */}
            {doctor && (
                <section className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-sm border">
                        {doctor.avatar && (
                            <div className="w-48 h-48 relative rounded-full overflow-hidden shrink-0 border-4 border-gray-100 bg-gray-200">
                                <Image
                                    src={getImageUrl(doctor.avatar) || ''}
                                    alt={doctor.full_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2 text-[var(--primary)]">{doctor.full_name}</h2>
                            <p className="text-xl text-gray-600 font-medium mb-4">{doctor.title} - {doctor.specialty}</p>
                            <div className="prose prose-sm text-gray-500 line-clamp-4 leading-relaxed">{doctor.bio}</div>
                        </div>
                    </div>
                </section>
            )}

            {/* Treatments Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-10">Tedavilerimiz</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {treatments.map((t) => (
                        <Link key={t.id} href={`/tedaviler/${t.slug}`} className="group">
                            <div className="border hover:border-[var(--primary)] transition-all p-6 rounded-lg h-full hover:shadow-md bg-white">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)]">{t.title}</h3>
                                <p className="text-gray-600 line-clamp-3">{t.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link href="/tedaviler" className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                        Tüm Tedavileri Gör
                    </Link>
                </div>
            </section>

            {/* Prices Preview */}
            <section className="container mx-auto px-4 bg-gray-50 py-16 rounded-xl mb-8">
                <h2 className="text-3xl font-serif font-bold text-center mb-10">Örnek Fiyatlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prices.map((p) => (
                        <div key={p.id} className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <h4 className="font-bold text-lg mb-2">{p.name || 'Tedavi'}</h4>
                            <p className="text-2xl font-bold text-[var(--primary)]">
                                {typeof p.amount === 'number' ? p.amount.toLocaleString('tr-TR') : p.amount} {p.currency}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link href="/fiyatlar" className="text-[var(--primary)] font-bold hover:underline text-lg">
                        Tüm Fiyat Listesi →
                    </Link>
                </div>
            </section>
        </div>
    );
}
