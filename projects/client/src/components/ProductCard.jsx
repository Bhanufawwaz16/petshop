import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/20/solid";
import ProductNotFound from "../components/ProductNotFound";
import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../assets/broken-img.png";
// import ProductListSkeleton from "./ProductListSkeleton";
import ProductNotFoundDark from "./ProductNotFoundDark";

export default function ProductCard({
  products = [],
  isLoading = false,
  darkMode = false,
}) {
  //   if (isLoading) return <ProductListSkeleton />;
  console.log("products", products);
  if (!products.length && !isLoading)
    return darkMode ? <ProductNotFoundDark /> : <ProductNotFound />;

  return (
    <div className="mb-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          state={{ productDt: product }}
        >
          <div className="shadow-md rounded-md border p-4 min-h-[460px] bg-white">
            <div>
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <img
                  src={
                    product && product.image_url.length > 0
                      ? `http://localhost:2000/static/products/${product.image_url}`
                      : BrokenImg
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = BrokenImg;
                  }}
                  alt="product"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
              </div>
              <p className="relative text-lg font-semibold text-red-400 truncate">
                {numToIDRCurrency(product.price)}
              </p>
              {/* <ProductVoucherBadge product={product} /> */}
              <div className="flex gap-1 items-center mt-2">
                {/* <MapPinIcon className="w-3 h-3 text-gray-400" /> */}
                <p className="text-sm text-gray-900">
                  {product.m_stocks[0].stock}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
         
    </div>
  );
}
