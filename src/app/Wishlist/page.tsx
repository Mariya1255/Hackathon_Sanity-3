import Link from "next/link";
import Image from "next/image";

function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Product 1",
      image: "/product1.png", // Replace with actual image paths
      price: "$50.00",
    },
    {
      id: 2,
      name: "Product 2",
      image: "/product2.png",
      price: "$75.00",
    },
    {
      id: 3,
      name: "Product 3",
      image: "/product3.png",
      price: "$100.00",
    },
  ];

  return (
    <div className="w-full bg-neutral-100 min-h-screen px-6 sm:px-12 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-950 border-b py-4 px-6">
          Wishlist
        </h1>
        {wishlistItems.length > 0 ? (
          <div className="p-6 space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-950">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/shoplist"
                    className="px-4 py-2 bg-[#FB2E86] text-white text-sm rounded-lg hover:bg-[#F94C9B] transition-colors"
                  >
                    Buy Now
                  </Link>
                  <button className="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-600">Your wishlist is empty.</p>
            <Link
              href="/Shop"
              className="mt-4 inline-block px-6 py-2 bg-[#FB2E86] text-white text-sm rounded-lg hover:bg-[#F94C9B] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
