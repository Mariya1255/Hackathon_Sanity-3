"use client";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/type/Product';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

const ProductDetails = ({ product }: { product: Product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="font-sans text-[#151875]">
      {/* Header Section */}
      <div className="py-28 px-8">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          <a href="/" className="text-gray-700 hover:underline">Home</a>
          <p>Pages</p>
          <p className="text-[#FB2E86]">{product.name}</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-8 flex flex-col md:flex-row gap-6">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={product.name}
            width={500}
            height={400}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-lg font-bold">${product.price}</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  return {
    props: { product },
  };
};

export default ProductDetails;
