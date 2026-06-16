import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Basic validation - the client component will do the actual product lookup
  if (!slug) {
    notFound();
  }

  return <ProductDetailClient slug={slug} />;
}
