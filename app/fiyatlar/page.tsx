import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const revalidate = 60;

async function getPricesWithTreatments() {
    // Fetch prices and expand related treatment
    try {
        return await directus.request(readItems('treatment_price', {
            fields: ['*', 'treatment_id.title', 'treatment_id.slug']
        }));
    } catch (e) {
        return [];
    }
}

export default async function PricesPage() {
    const prices = await getPricesWithTreatments();

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-serif font-bold mb-4 text-center">Fiyat Listesi</h1>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                Tüm tedavilerimiz için şeffaf fiyatlandırma politikamızla hizmetinizdeyiz.
                <br /><span className="text-xs text-gray-400">*Fiyatlar bilgilendirme amaçlıdır, muayene sonrası kesinleşir.</span>
            </p>

            <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border shadow-sm">
                <table className="w-full text-left bg-white">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="py-4 px-6 font-bold text-gray-700">Tedavi</th>
                            <th className="py-4 px-6 font-bold text-gray-700">İşlem</th>
                            <th className="py-4 px-6 font-bold text-gray-700 text-right">Fiyat</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {prices.map((price) => (
                            <tr key={price.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 font-medium text-[var(--primary)]">
                                    {/* @ts-ignore - Directus SDK types can be tricky with expansion */}
                                    {price.treatment_id?.title || '-'}
                                </td>
                                <td className="py-4 px-6 text-gray-600">
                                    {price.name}
                                </td>
                                <td className="py-4 px-6 text-right font-bold text-lg">
                                    {typeof price.amount === 'number' ? price.amount.toLocaleString('tr-TR') : price.amount} <span className="text-sm font-normal text-gray-500">{price.currency}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
