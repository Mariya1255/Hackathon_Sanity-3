import { useState } from 'react';
import { Product } from '../../type/Product';
import Pagination from '../components/Pagination';
import { urlFor } from '../../sanity/lib/image'; // Ensure correct import for image processing

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {product.image && ( // Ensure image exists before rendering
              <img 
                src={urlFor(product.image).url()} // Correctly generate image URL
                alt={product.name} 
                width={150}
                height={150}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <span className="text-lg font-bold">${product.price}</span>
            </div>
            <button className="mt-4 bg-primary text-black px-6 py-2 rounded hover:bg-opacity-90">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProductList;
