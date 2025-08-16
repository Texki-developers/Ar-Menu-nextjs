import HomeBanner from '@/components/home/banner/banner';
import HomeMainSection from '@/components/home/main-section/HomeMainSection';
import { ProductService } from '@/core/services/productService';
import { notFound } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;
  const vendorDetails = await ProductService.getVendorDetails(vendorId);
  const categories = await ProductService.getProductsCategories(vendorId);
  if (!categories) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      {vendorDetails && <HomeBanner vendorDetails={vendorDetails?.data} />}
      <HomeMainSection categoryData={categories} />
    </div>
  );
}
