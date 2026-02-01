import directus, { getImageUrl } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getTreatment(slug: string) {
    try {
        const treatments = await directus.request(readItems('treatment', {
            filter: { slug: { _eq: slug } },
            limit: 1,
        }));
        return treatments?.[0] || null;
    } catch (e) {
        return null;
    }
}

async function getPrices(treatmentId: string) {
    try {
        return await directus.request(readItems('treatment_price', {
            filter: { treatment_id: { _eq: treatmentId } }
        }));
    } catch (e) {
        return [];
    }
}

export default async function TreatmentDetailPage({ params }: { params: { slug: string } }) {
    const treatment = await getTreatment(params.slug);

    if (!treatment) {
        notFound();
    }

    const prices = await getPrices(treatment.id);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--primary)] mb-6">
                    {treatment.title}
                </h1>

                {treatment.cover_image && (
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mb-10 bg-gray-100">
                        <Image
                            src={getImageUrl(treatment.cover_image) || ''}
                            alt={treatment.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none mb-16">
                    {/* Direct rendering of content, assuming it's text. Use a markdown renderer if content is markdown */}
                    <div className="whitespace-pre-line leading-relaxed text-gray-700">
                        {treatment.content || treatment.summary}
                    </div>
                </div>

                {prices.length > 0 && (
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold mb-6 font-serif">Tedavi Fiyatları</h3>
                        <div className="space-y-4">
                            {prices.map(price => (
                                <div key={price.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
                                    <span className="font-medium text-lg">{price.name}</span>
                                    <span className="font-bold text-xl text-[var(--primary)]">
                                        {typeof price.amount === 'number' ? price.amount.toLocaleString('tr-TR') : price.amount} {price.currency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
