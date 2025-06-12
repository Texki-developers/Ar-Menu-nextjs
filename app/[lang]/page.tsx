import HomeBanner from '@/components/home/banner/banner';
import Title from '@/components/home/title/Title';
import HomeMainSection from '@/components/home/main-section/HomeMainSection';
import { ILocale } from '@/lib/dictionaries/config';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: ILocale }>;
}) {
  const { lang } = await params;
  return (
    <div className="flex flex-col gap-8">
      <HomeBanner />
      <Title title="Coz Coffee" subtitle="Karmas, Dubai" />
      <HomeMainSection />
    </div>
  );
}
