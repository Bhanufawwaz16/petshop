import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../assets/broken-img.png";

export default function TableBodyProduct({
  products = [],
  onEdit,
  setAction,
  onDelete,
}) {
  console.log("product mas lindhu", products);
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {products.map(
        (product) => (
          // product.Stocks.map((stock, stockIdx) => (
          <tr key={product.id}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10"
                    src={
                      product && product.image_url.length > 0
                        ? `http://localhost:2000/static/products/${product.image_url}`
                        : BrokenImg
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = BrokenImg;
                    }}
                    alt={product.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900 truncate max-w-[200px]">
                    {product.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-3 text-left py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {product.m_category?.name || "—"}
              </div>
            </td>
            <td className="px-3 py-4 text-left text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {numToIDRCurrency(product.price)}
              </div>
            </td>
            <td className="px-3 py-4 text-left text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {numToIDRCurrency(product.price_from_suplier)}
              </div>
            </td>
            <td className="px-3 py-4 text-left text-sm text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {product.description || "—"}
              </div>
            </td>
            <td className="px-3 py-4 text-left text-sm text-gray-500 text-center">
              <div
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  product.m_stocks[0].stock > 20
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-left max-w-[100px] truncate">
                  {product.m_stocks[0].stock || 0}
                </span>
              </div>
            </td>
            {/* <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {stock.Branch?.name}
              </div>
            </td> */}
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-teal-600 hover:text-teal-900"
                onClick={() => {
                  onEdit(product);
                  setAction("edit");
                }}
              >
                Edit<span className="sr-only">{product.name}</span>
              </button>
              <button
                className="text-red-600 hover:text-red-900 ml-4"
                onClick={() => onDelete(product.id)}
              >
                Delete
                <span className="sr-only">{product.name}</span>
              </button>
            </td>
          </tr>
        )
        // ))
      )}
       
    </tbody>
  );
}
