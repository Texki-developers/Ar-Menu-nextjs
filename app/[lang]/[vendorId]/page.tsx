import HomeBanner from '@/components/home/banner/banner';
import Title from '@/components/home/title/Title';
import HomeMainSection from '@/components/home/main-section/HomeMainSection';
import { ProductService } from '@/core/services/productService';
import { notFound } from 'next/navigation';

export default async function Home({ params }: { params: { vendorId: string } }) {
  const { vendorId } = await params; 
  const categories = await ProductService.getProductsCategories(vendorId);
  if (!categories) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <HomeBanner />
      <Title title="Coz Coffee" subtitle="Karmas, Dubai" />
      <HomeMainSection categoryData={categories} />
    </div>
  );
}
