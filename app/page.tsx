import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const revalidate = 60;

async function getHomeData(): Promise<{
  clinic: any | null;
  doctor: any | null;
  treatments: any[];
  prices: any[];
}> {
  try {
    const clinicList = (await directus.request(
      readItems('clinic' as any, { limit: 1 }) as any
    )) as any[];

    const doctorList = (await directus.request(
      readItems('doctor' as any, { limit: 1 }) as any
    )) as any[];

    const treatments = (await directus.request(
      readItems('treatment' as any, { limit: 6 }) as any
    )) as any[];

    const prices = (await directus.request(
      readItems('treatment_price' as any, { limit: 6 }) as any
    )) as any[];

    return {
      clinic: Array.isArray(clinicList) ? clinicList[0] : null,
      doctor: Array.isArray(doctorList) ? doctorList[0] : null,
      treatments: Array.isArray(treatments) ? treatments : [],
      prices: Array.isArray(prices) ? prices : [],
    };
  } catch (e) {
    return { clinic: null, doctor: null, treatments: [], prices: [] };
  }
}

export default async function HomePage() {
  const { clinic, doctor, treatments, prices } = await getHomeData();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">
        {clinic?.name ?? 'Klinik'}
      </h1>

      <p className="mt-2 text-gray-600">
        {clinic?.description ?? 'Hoş geldiniz.'}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Doktor</h2>
        <p className="mt-2">
          {doctor?.name ?? '-'}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Tedaviler</h2>
        <ul className="mt-3 list-disc pl-6">
          {treatments.length ? (
            treatments.map((t: any) => <li key={t?.id}>{t?.title ?? '-'}</li>)
          ) : (
            <li>-</li>
          )}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Örnek Fiyatlar</h2>
        <ul className="mt-3 list-disc pl-6">
          {prices.length ? (
            prices.map((p: any) => (
              <li key={p?.id}>
                {p?.name ?? '-'}: {p?.amount != null ? Number(p.amount).toLocaleString('tr-TR') : '-'} {p?.currency ?? ''}
              </li>
            ))
          ) : (
            <li>-</li>
          )}
        </ul>
      </section>
    </main>
  );
}
