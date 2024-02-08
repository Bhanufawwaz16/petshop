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
          <div className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={
                  `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${product.image_url}` ||
                  BrokenImg
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = BrokenImg;
                }}
                alt="product"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {numToIDRCurrency(product.price)}
              </p>
            </div>
          </div>
        </Link>
      ))}
             
    </div>
  );
}
